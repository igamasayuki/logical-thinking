var url = location.href;
var path = location.pathname;
var uri = url.replace(path, "");

let URL = uri + '/logicalthinking/logictree/api';
$(document).ready( function(){
    $.ajax({
        url: URL + '/get/session',
        type: 'get',
    }).done(function(data){
        // 成功時の処理
        if(data != ''){
            // 画面にhtml要素を追加する
            addHTML(data)
        }
    })
});
function addHTML(data){
    // ロジックツリーに関する記述を追加
    // 相手が欲しいもの
    $('#partnerWants').val(data.partnerWants);
    $('#copyPartnerWants').html($('#partnerWants').val());
    // あなたの現場
    $('#currentState').val(data.currentState);
    $('#copyCurrentState').html($('#currentState').val());
    // 説明したいもの
    $('input[name="clarify"]').eq(data.descriptionType == 1 ? 0 : 1).prop('checked', true);
    if($('input[name="clarify"]').val() == 1){
        // 原因(理由)を選択
        $('#reason').css("display", "block");
        $('#method').css("display", "none");
        $('.clarify').html('原因(理由)');
    } else if($('input[name="clarify"]').val() == 2) {
        // 方法を選択
        $('#reason').css("display", "none");
        $('#method').css("display", "block");
        $('.clarify').html('方法');
    }
    // フレームワーク
    $('[name="fw"]').val(data.frameworkId);
    $('#logicTreeId').val(data.id)
    // 記述用の値(原因 or 方法)を取得
    clarify = $('input[name="clarify"]').val() == 1 ? '原因(理由)' : '方法';
    // 第一階層を追加 (取得した要素分を追加)
    for (let index = 0; index < data.firstHierarchyList.length; index++) {
        firstHierarchy = data.firstHierarchyList[index];
        name = 'fh' + index;
        new_list = '<section class="fw" name="fh' + index +'">' + 
        '<input type="hidden" name="fh' + index + '_id" value="' + firstHierarchy.id + '">' +
        '<div">' + 
        '<div class="row">' + 
        '<label for="" class="col-11">' +
        firstHierarchy.word + 'に関する具体的な【<font class="clarify">' + clarify + '</font>】を挙げてください' + 
        '</label>' +
        '<input type="hidden" value="' + firstHierarchy.word + '">' + 
        '<button type="button" onclick="button(this, \'delete\')" name="fh" class="btn btn-danger col-1">削除</button>' + 
        '</div>' +
        '</div>' + 
        '</section>';
        // 「第二階層を追加」ボタンを追加
        secondHierarchyButton = '<div name="addSH" class="row"><button onclick="button(this, \'addSh\', \'fh' + index + '\')" class="btn btn-primary col-3 mb-2">第二階層を追加する</button></div>'
        // $('#fw' + data[index].id).append(secondHierarchyButton);

        // 「〇〇」を言い換えるとを追加
        anotherWordText = '<br>' + 
        '<div class="row">' +
        '<label for="">「' + firstHierarchy.word + '」を言い換えると何ですか？</label>' + 
        '</div>' + 
        '<div class="row">' + 
        '<input name="anotherWord" type="text" class="form-control mb-5" value="' + firstHierarchy.anotherWord + '">' + 
        '</div>';
        $('#hierarchy').append(new_list);
        $('#hierarchy').children('section[name=fh'+ index + ']').before(secondHierarchyButton + anotherWordText)
         // $('#fw' + data[index].id).append(anotherWordText)
         // 第二階層を追加
         //TODO 今, idが入っているため, このif文は意味がない
         if(firstHierarchy.secondHierarchyList.length != null){ 
             for(let index2 = 0; index2 < firstHierarchy.secondHierarchyList.length; index2++){
               secondHierarchy = firstHierarchy.secondHierarchyList[index2];
               // 上記の様にhtmlの追加をしないためにexplanationがnullの場合はbreak
               if(secondHierarchy.explanation == null) break;
               shName = name + '_sh' + index2;
   
               addSHSection = '<section class="" name="' + shName + '">' + 
               '<div class="row">' + 
               '<label for="" class="col-2">第二階層：</label>' + 
               '<input type="text" class="form-control col-9" value="' + secondHierarchy.explanation + '">' + 
               '<button name="sh" onclick="button(this,\'delete\',\'' + name + '\')" type="button" class="btn btn-primary col-1">削除</button>' + 
               '</div>' + 
               '<div class="row" name="addTH">' + 
               '<button name="th" onclick="button(this, \'addTH\',\'' + shName + '\')" type="button" class="btn btn-info offset-1 col-3 mb-2">第三階層を追加</button>' + 
               '</div>' + 
               '</section>';
               $('section[name=' + name + ']').children('div[name=addSH]').before(addSHSection);

               for(let index3 = 0; index3 < secondHierarchy.thirdHierarchyList.length; index3++){
                    thirdHierarchy = secondHierarchy.thirdHierarchyList[index3]
                    thName = shName + '_th' + index3;
                    addTHSection = 
                    '<section name="' + thName + '">' + 
                    '<div class="row"><label for="" class="offset-1 col-2">第三階層：</label>' + 
                    '<input type="text" class="form-control col-8 float-right" value="' + thirdHierarchy.explanation +  '">' +
                    '<button name="th" onclick="button(this,\'delete\',\'' + shName + '\')" type="button" class="btn btn-info col-1">削除</button>' + 
                    '</div>' + 
                    '</section>';
                    $('section[name=' + shName + ']').children('div[name=addTH]').before(addTHSection);
               }
             }
         }
      }
      addFH = '<div class="row">' + 
          '<button id="addFHButton" onclick="button(this, \'addFH\')" type="button" class="btn btn-danger col-3 mb-5">第一階層を追加する</button>' + 
          '</div>';
      $('#hierarchy').append(addFH)

}
// 削除予定
window.addEventListener("load", function(){
    // var flowchart = new FlowChart('myCanvas', {
    //     start_x    : 100,  // チャートの開始位置(X軸)
    //     width      : 180,  // チャートの横幅 (単位: px)
    //     height     : 40,   // チャートの高さ (単位: px)
    //     distance_x : 50,   // チャート間の距離(X軸)
    //     distance_y : 20,   // チャート間の距離(Y軸)
    //     fullscreen : true, // フルスクリーン表示
    //     margin     : 20,   // マージン (単位: px)
    // });
    // flowchart.init(
    //   '課題',   // 基準のチャートのラベル
    //   [           // 初期データ
    //     {label:'太郎', children:[
    //       {label: '四郎', children: []},
    //       {label: '五郎', children: [
    //         {label: '孫太郎', children: []},
    //         {label: '孫次郎', children: []},
    //       ]},Fsubmit

    //     ]},
    //     {label:'次郎', children:[]},
    //     {label: '三郎', children: [
    //       {label: '六郎', children: []},
    //       {label: '七郎', children: []},
    //     ]},
    //     {label: '花子', children: [
    //       {label: '奈々子', children: []},
    //       {label: '八重子', children: []},
    //     ]},
    //   ]
    // );
});
function test(){
    // ロジックツリーの値を取得
    logicTree = {
        // 更新処理ではなく, 削除からの新規作成のためidをコメントアウト
        // id : $('#logicTreeId').val(),
        partnerWants : $('#partnerWants').val(),
        currentState : $('#currentState').val(),
        descriptionType : $('input[name="clarify"]').val(),
        frameworkId : $('[name="fw"]').val(),
        insistence : $('#insistence').val(),
        firstHierarchyList : []
    }
    // 第一階層の数を取得
    for(let index = 0; index < $('.fw').length; index++){
        // ex. fh0, fh1 ...
        fHName = 'fh' + index;
        // 第一階層の値を取得
        firstHierarchy = {
            word : $('section[name=' + fHName + '] div div input').val(),
            anotherWord : $('section[name=' + fHName + '] input[name=anotherWord]').val(),
            logicTreeId : 0,
            displayOrder : index + 1,
            secondHierarchyList : []
        }
        // 第二階層の数を取得 (第一階層で取得したnameの直接の子要素のsectionの数を取得)
        // childrenの使用理由: 同列階層のsectionを除くため
        for(let index2 = 0; index2 < $('section[name=' + fHName + ']').children('section').length; index2++){
            // ex. fh0_sh0, fh0_sh1 ...
            sHName = fHName + '_sh' + index2;
            // 第二階層の値を取得
            secondHierarchy = {
                explanation : $('section[name=' + sHName + '] input').val(),
                displayOrder : index2 + 1,
                thirdHierarchyList : []
            }
            // 第三階層の数を取得 (第二階層で取得したnameの子要素のsectionの数を取得)
            for(let index3 = 0; index3 < $('section[name=' + sHName + '] section').length; index3++){
                tHName = sHName + '_th' + index3;
                thirdHierarchy = {
	                explanation : $('section[name=' + tHName + '] input').val(),
	                displayOrder : index3 + 1
                }
                secondHierarchy.thirdHierarchyList.push(thirdHierarchy)
            }
            firstHierarchy.secondHierarchyList.push(secondHierarchy)
        }
        logicTree.firstHierarchyList.push(firstHierarchy)
    }
    // json化
    var url = location.href;
    var path = location.pathname;
    var uri = url.replace(path, "");
    var param = JSON.stringify(logicTree);
    $.ajax({
        url: URL + '/upsert',
        type: 'post',
        dataType: 'json',
        data: param,
        contentType: "application/json; charset=utf-8"
        // data : {"partnerWants" : "test"}
    }).done(function(data){
        // 登録したidを次のページに引き継ぐ
    	location.href= uri + '/logicalthinking/pyramid';
    })
}
function checkedTree(){
    list = []
         // ロジックツリーの値を取得
         logicTree = {
            partnerWants : $('#partnerWants').val(),
            currentState : $('#currentState').val(),
            descriptionType : $('input[name="clarify"]').val(),
            frameworkId : $('[name="fw"]').val(),
            insistance : $('#insistence').val(),
            firstHierarchyList : []
        }
        // 第一階層の数を取得
        for(let index = 0; index < $('.fw').length; index++){
            // ex. fh0, fh1 ...
            fHName = 'fh' + index;
            // 第一階層の値を取得
            data = {
                label : $('section[name=' + fHName + '] div div input').val(),
                children : []
            }
            // 第二階層の数を取得 (第一階層で取得したnameの直接の子要素のsectionの数を取得)
            // childrenの使用理由: 同列階層のsectionを除くため
            for(let index2 = 0; index2 < $('section[name=' + fHName + ']').children('section').length; index2++){
                // ex. fh0_sh0, fh0_sh1 ...
                sHName = fHName + '_sh' + index2;
                // 第二階層の値を取得
                secondHierarchy = {
                    label : $('section[name=' + sHName + '] input').val(),
                    children : []
                }
                // 第三階層の数を取得 (第二階層で取得したnameの子要素のsectionの数を取得)
                for(let index3 = 0; index3 < $('section[name=' + sHName + '] section').length; index3++){
                    tHName = sHName + '_th' + index3;
                    thirdHierarchy = {
                    explanation : $('section[name=' + tHName + '] input').val()
                    }
                    secondHierarchy.children.push(thirdHierarchy)
                }
                data.children.push(secondHierarchy)
            }
            list.push(data)
            logicTree.firstHierarchyList.push(data)
        }
        var flowchart = new FlowChart('myCanvas', {
            start_x    : 100,  // チャートの開始位置(X軸)
            width      : 180,  // チャートの横幅 (単位: px)
            height     : 40,   // チャートの高さ (単位: px)
            distance_x : 50,   // チャート間の距離(X軸)
            distance_y : 20,   // チャート間の距離(Y軸)
            fullscreen : true, // フルスクリーン表示
            margin     : 20,   // マージン (単位: px)
        });
        flowchart.init(
           '課題\naaaaaaaaaaaaaaaaaaaaaaaaaa',
           [
               {label: 'test', children:[]}
           ]
        )
        // 欲しいデータ
        // flowchart.init(
        //     '佐藤家',   // 基準のチャートのラベル
        //     [           // 初期データ
        //       {label:'第一階層', children:[
        //         {label: '第二階層', children: []},
        //         {label: '第二階層', children: [
        //           {label: '第三階層', children: []},
        //           {label: '第三階層', children: []},
        //         ]},
        //       ]},
        //       {label:'次郎', children:[]},
        //       {label: '三郎', children: [
        //         {label: '六郎', children: []},
        //         {label: '七郎', children: []},
        //       ]},
        //       {label: '花子', children: [
        //         {label: '奈々子', children: []},
        //         {label: '八重子', children: []},
        //       ]},
        //     ]
}

// 「第一階層を追加する」の後処理
function keyup(thisEle){
    // sectionのnameを取得
    name = $(thisEle).parent().parent().parent().parent().attr('name')
    $('section[name='+ name + '] font[name=word]').html($(thisEle).val())
    $('section[name='+ name + '] input[name=word]').val($(thisEle).val())
}



$(function(){
//	// 主張の選択肢を追加
//	$(document).on("blur", ".row2", function(){
//		var val = $(this).val(); 
//		if("" !== val){
//			var select = document.getElementById("select-claim");
//			$('<option>', { text:val, value:val: });
//			select.appendChild(option);
//		}
//	});
//	
//	// 主張の選択肢を削除
//	$(document).on("click", ".row2", function(){
//		$('#select-claim').children('[value=' + $(this).val() + ']').remove();
//	});
	
    // 「相手が欲しいもの」の入力結果を反映
    $( document ).on( 'keyup', '#partnerWants' , function(){ 
        $('#copyPartnerWants').html($( this ).val());
    });
    // 「あなたの現場」の入力結果を反映
    $( document ).on( 'keyup', '#currentState' , function(){ 
        $('#copyCurrentState').html($( this ).val());
    });
    // ラジオボタンが変更されたらイベント発生
    // class="clarify"に対して対象の文言をhtmlで追加
    $('input[name="clarify"]').change(function () {
        if($( this ).val() == 1){
            // 原因(理由)を選択
            $('#reason').css("display", "block");
            $('#method').css("display", "none");
            $('.clarify').html('原因(理由)');
        } else if($(this).val() == 2) {
            // 方法を選択
            $('#reason').css("display", "none");
            $('#method').css("display", "block");
            $('.clarify').html('方法');
        }
      });
      // name="fw"の値が変更されたらイベント発生
      // ドロップダウンの値が変更されたら, 変更後の値に対応したframeworkElementを取得
      $('[name="fw"]').change(function () {
          // 記述用の値(原因 or 方法)を取得
          clarify = $('input[name="clarify"]').val() == 1 ? '原因(理由)' : '方法';
          var url = location.href;
          var path = location.pathname;
          var uri = url.replace(path, "");
          $.ajax({
              url: uri + '/api/frameworkelement/get/' + $(this).val(),
              type: 'get'
          }).done(function(data){
            frameworkElement = data
            // 既存のフレームワークの要素を削除
            $('#hierarchy > div').remove();
            $('#hierarchy > .fw').remove();
              
              // 第一階層を追加 (取得した要素分を追加)
              for (let index = 0; index < data.length; index++) {
                  dataId = data[index].id;
                  fwId = 'fw' + dataId;
                  fhId = 'fh' + dataId;
                  deleteFh = 'deleteFh' + dataId;

                  shId = 'sh' + dataId;

                  new_list = '<section class="fw" id="'+ fwId +'" name="fh' + index +'">' + 
                  '<div id="' + fhId + '">' + 
                  '<div class="row">' + 
                  '<label for="" class="col-11">' +
                  data[index].element + 'に関する具体的な【<font class="clarify">' + clarify + '</font>】を挙げてください' + 
                  '</label>' +
                  '<input type="hidden" value="' + data[index].element +  '">' + 
                  '<button name="fh" type="button" onclick="button(this, \'delete\', \'\')" id="' + deleteFh + '" class="btn btn-danger col-1">削除</button>' + 
                  '</div>' +
                  '</div>' + 
                  '</section>';
                  $('#hierarchy').append(new_list);
                    // 「第二階層を追加」ボタンを追加
                    secondHierarchyButton = '<div name="addSH" id="addSh' + data[index].id + '" class="row"><button onclick="button(this, \'addSh\', \'fh' + index + '\')" class="btn btn-primary col-3 mb-2">第二階層を追加する</button></div>'
                    $('#fw' + data[index].id).append(secondHierarchyButton);
                    
                    var name = 'fh' + index;
                    
                    shName = name + '_sh' + $('.fw[name=' + name + '] section').length

                    addHtml = '<section class="" name="' + shName + '">' + 
                    '<div class="row">' + 
                    '<label for="" class="col-2">第二階層：</label>' + 
                    '<input type="text" class="form-control col-9" value="">' + 
//                    '<input type="text" class="form-control col-9 row2" value=""　onblur="createClaimOption(this)">' + 
                    '<button name="sh" onclick="button(this,\'delete\',\'' + name + '\')" type="button" class="btn btn-primary col-1">削除</button>' + 
                    '</div>' + 
                    '<div class="row">' + 
                    '<button name="th" onclick="button(this, \'addTH\',\'' + shName + '\')" type="button" class="btn btn-info offset-1 col-3 mb-2">第三階層を追加</button>' + 
                    '</div>' + 
                    '</section>';
                    if (typeof fhId === 'string') {
                        // 第二階層入力時に「第三階層を追加する」ボタンを追加する
                        $('#' + fhId).after(addHtml);
                    } else if (typeof fhId === 'object'){
                        $(fhId).parent().before(addHtml);
                    }

                    // 「〇〇」を言い換えるとを追加
                    anotherWordText = '<br>' + 
                    '<div class="row">' +
                    '<label for="">「' + data[index].element + '」を言い換えると何ですか？</label>' + 
                    '</div>' + 
                    '<div class="row">' + 
                    '<input name="anotherWord" type="text" class="form-control mb-5" value="">' + 
                    '</div>';
                    $('#fw' + data[index].id).append(anotherWordText)

                    
                }
                addFH = '<div class="row">' + 
                    '<button id="addFHButton" onclick="button(this, \'addFH\')" type="button" class="btn btn-danger col-3 mb-5">第一階層を追加する</button>' + 
                    '</div>';
                $('#hierarchy').append(addFH)
            });
        });

        // step2へ遷移する処理
        $('#submit').on('click', function(){
            // ロジックツリーの値を取得
            logicTree = {
                partnerWants : $('#partnerWants').val(),
                currentState : $('#currentState').val(),
                descriptionType : $('input[name="clarify"]').val(),
                frameworkId : $('[name="fw"]').val(),
                insistence : $('#insistence').val(),
                firstHierarchyList : []
            }
            // 第一階層の数を取得
            for(let index = 0; index < $('.fw').length; index++){
                // ex. fh0, fh1 ...
                fHName = 'fh' + index;
                // 第一階層の値を取得
                firstHierarchy = {
                    word : $('section[name=' + fHName + '] div div input').val(),
                    anotherWord : $('section[name=' + fHName + '] input[name=anotherWord]').val(),
                    logicTreeId : 0,
                    secondHierarchyList : []
                }
                // 第二階層の数を取得 (第一階層で取得したnameの直接の子要素のsectionの数を取得)
                // childrenの使用理由: 同列階層のsectionを除くため
                for(let index2 = 0; index2 < $('section[name=' + fHName + ']').children('section').length; index2++){
                    // ex. fh0_sh0, fh0_sh1 ...
                    sHName = fHName + '_sh' + index2;
                    // 第二階層の値を取得
                    secondHierarchy = {
                        explanation : $('section[name=' + sHName + '] input').val(),
                        thirdHierarchyList : []
                    }
                    // 第三階層の数を取得 (第二階層で取得したnameの子要素のsectionの数を取得)
                    for(let index3 = 0; index3 < $('section[name=' + sHName + '] section').length; index3++){
                        tHName = sHName + '_th' + index3;
                        thirdHierarchy = {
                        explanation : $('section[name=' + tHName + '] input').val()
                        }
                        secondHierarchy.thirdHierarchyList.push(thirdHierarchy)
                    }
                    firstHierarchy.secondHierarchyList.push(secondHierarchy)
                }
                logicTree.firstHierarchyList.push(firstHierarchy)
            }
            var form = document.createElement("form");
            form.setAttribute("action", "/test");
            form.setAttribute("method","post");
            document.body.appendChild(form);
            for(var parame in logicTree){
                // 第一階層のforms作成
                if(parame === 'firstHierarchyList'){
                    for(let index = 0; index < logicTree[parame].length; index++){
                        for(var firstHierarchyParam in logicTree[parame][index]){
                            // 第二階層のform作成
                            if(firstHierarchyParam === 'secondHierarchyList'){
                                // 第二階層に値が入力されている場合
                                for(let index2 = 0; index2 < logicTree[parame][index][firstHierarchyParam].length; index2++){
                                    for(var secondHierarchyParam in logicTree[parame][index][firstHierarchyParam][index2]){
                                        // 第三階層のform作成
                                        if(secondHierarchyParam === 'thirdHierarchyList'){
                                            // 第三階層に値が入力されている場合
                                            for(let index3 = 0; index3 < logicTree[parame][index][firstHierarchyParam][index2][secondHierarchyParam].length; index3++){
                                                for(var thirdHierarchyParam in logicTree[parame][index][firstHierarchyParam][index2][secondHierarchyParam][index3]){
                                                    var inputTH = document.createElement('input');
                                                    inputTH.setAttribute('type', 'hidden');
                                                    inputTH.setAttribute('name', parame + '[' + index + '].' + firstHierarchyParam + '[' + index2 + '].' + secondHierarchyParam + '[' + index3 + '].' + thirdHierarchyParam)
                                                    inputTH.setAttribute('value', logicTree[parame][index][firstHierarchyParam][index2][secondHierarchyParam][index3][thirdHierarchyParam]);
                                                    form.appendChild(inputTH);
                                                }
                                            }
                                        }else {
                                            var inputSH = document.createElement('input');
                                            inputSH.setAttribute('type', 'hidden');
                                            inputSH.setAttribute('name', parame + '[' + index + '].' + firstHierarchyParam + '[' + index2 + '].' + secondHierarchyParam);
                                            inputSH.setAttribute('value', logicTree[parame][index][firstHierarchyParam][index2][secondHierarchyParam]);
                                            form.appendChild(inputSH);
                                        }
                                    }
                                }
                            } else {
                                var inputFH = document.createElement('input');
                                inputFH.setAttribute('type', 'hidden');
                                inputFH.setAttribute('name', parame + '[' + index + '].' + firstHierarchyParam);
                                inputFH.setAttribute('value', logicTree[parame][index][firstHierarchyParam]);
                                form.appendChild(inputFH);
                            }
                        }
                    }
                } else {
                    var input = document.createElement('input');
                    input.setAttribute('type', 'hidden');
                    input.setAttribute('name', parame);
                    input.setAttribute('value', logicTree[parame]);
                    form.appendChild(input);
                }
            }
            form.submit();
        });
    });
    // 追加, 削除ボタンを押下場合にイベント発生
    // selectedId: 押下位置を取得
    // optiin: add(追加), delete(削除)
    // name: 追加したい要素名
    function button(selectedId, option, name){
        switch (option) {
            // 削除
            case 'delete':
                // 現在, 未使用
                // 特定できる要素(id)の場合
                if (typeof selectedId === 'string') {
                    $('#' + selectedId).remove();
                    for (let index = 0; index < $('.fw').length; index++) {
                        $('.fw').eq(index).attr('name','fh' + index)  
                    }
                } else if(typeof selectedId === 'object'){
                    // selecterIdがthisの場合
                    // 押下たボタンの所属で処理を分岐
                    switch ($(selectedId).attr('name')) {
                        // 「第一階層の削除」ボタンを押した場合
                        // 第一階層毎のnameを変更 → 変更した第二階層のnameを変更 → 変更した第三階層のnameを変更
                        case 'fh':
                            // ボタンの親要素から逆算してfirstHierarchyを削除するsectionのnameを取得
                            getName = $(selectedId).parent().parent().attr('name');
                            // section毎に囲まれているため, そのsection以下を削除
                            $(selectedId).parent().parent().parent().remove()
                            // 名前の連番を修正
                            // 第一階層の数を取得 (class="fw"は第一階層のsecsionに割り当てられている)
                            for (let index = 0; index < $('.fw').length; index++) {
                                // 第一階層のnameを変更する (ex. fh0, fh1 ...)
                                $('.fw').eq(index).attr('name','fh' + index)
                                // 第一階層直下の第二階層の数を取得 (childrenの使用: 孫要素以下を含めたくないため)
                                for(let index2 = 0; index2 < $('section[name=fh' + index + ']').children('section').length; index2++){
                                    // 新規の第二階層の名前
                                    newSHName = 'fh' + index + '_sh' + index2;
                                    oldSHName =  $('section[name=fh' + index + ']').children('section').eq(index2).attr('name');
                                    // 1つづつsection[name=fh0]の子要素の名前を変更
                                    $('section[name=fh' + index + ']').children('section').eq(index2).attr('name', newSHName);
                                    // 対応する第二階層の直下の第三階層の数を取得
                                    for(let index3 = 0; index3 < $('section[name=' + newSHName + '] section').length; index3++) {
                                        $('section[name=' + newSHName + '] section').eq(index3).attr('name', newSHName + '_th' + index3)
                                    }
                                }
                            }
                            break;
                            // 「第二階層の削除」ボタンを押した場合
                            case 'sh':
                                getName = $(selectedId).parent().parent().parent().attr('name');
                                $(selectedId).parent().parent().remove();
                                selecter = 'section[name=' + getName + ']';
                                for (let index = 0; index < $(selecter).children('section').length; index++) {
                                    newSHName = getName + '_sh' + index;
                                    $(selecter).children('section').eq(index).attr('name',newSHName)
                                    // 第三階層のnameを変更
                                    for(let index2 = 0; index2 < $('section[name=' + getName + '_sh' + index + '] section').length; index2++) {
                                        $('section[name=' + getName + '_sh' + index + '] section').eq(index2).attr('name', newSHName + '_th' + index2)
                                    }
                                }
                                break;
                            // 「第三階層の削除」ボタンを押した場合
                            case 'th':
                                $(selectedId).parent().parent().remove();
                                selecter = 'section[name=' + name + '] section';

                                for (let index = 0; index < $(selecter).length; index++) {
                                    $(selecter).eq(index).attr('name', name + '_th' + index)
                                }
                                break;
                        default:
                            break;
                    }

                }
                break;
            // 第一階層を追加
            case 'addFH':
                name = 'fh' + $('.fw').length
                clarify = $('input[name="clarify"]').val() == 1 ? '原因(理由)' : '方法';
                secondHierarchyButton = 
                '<div class="row">' + 
                '<button onclick="button(this, \'addSh\', \'' + name + '\')" class="btn btn-primary col-3 mb-2">第二階層を追加する</button>' + 
                '</div>'

                // 「〇〇」を言い換えるとを追加
                anotherWordText = '<br>' + 
                '<div class="row">' + 
                '<label for="">「 <font name="word"></font>」を言い換えると何ですか？</label>' + 
                '</div>' + 
                '<div class="row">' + 
                '<input name="anotherWord" type="text" class="form-control mb-5" value="">' + 
                '</div>';

                addHtml = '<section class="fw" name="' + name + '">' + 
                '<div>' + 
                '<div class="row">' + 
                '<label for="" class="col-11">' +
                '<input onkeyup="keyup(this)" type="text"></input>'+ 'に関する具体的な【<font class="clarify">' + clarify + '</font>】を挙げてください' + 
                '</label>' +
                '<button onclick="button(this, \'delete\')" name="fh" type="button" class="btn btn-danger col-1">削除</button>' + 
                '</div>' +
                '</div>' + 
                secondHierarchyButton +
                anotherWordText + 
                '</section>';

                $(selectedId).parent().before(addHtml);
                // 「第二階層を追加」ボタンを追加
                break;
            // 第二階層を追加
            case 'addSh':
                shName = name + '_sh' + $('.fw[name=' + name + '] section').length

                addHtml = '<section class="" name="' + shName + '">' + 
                '<div class="row">' + 
                '<label for="" class="col-2">第二階層：</label>' + 
                '<input type="text" class="form-control col-9" value="">' + 
//                '<input type="text" class="form-control col-9 row2" value=""　onblur="createClaimOption(this)">' + 
                '<button name="sh" onclick="button(this,\'delete\',\'' + name + '\')" type="button" class="btn btn-primary col-1">削除</button>' + 
                '</div>' + 
                '<div class="row">' + 
                '<button name="th" onclick="button(this, \'addTH\',\'' + shName + '\')" type="button" class="btn btn-info offset-1 col-3 mb-2">第三階層を追加</button>' + 
                '</div>' + 
                '</section>';
                if (typeof selectedId === 'string') {
                    // 第二階層入力時に「第三階層を追加する」ボタンを追加する
                    $('#' + selectedId).after(addHtml);
                } else if (typeof selectedId === 'object'){
                    $(selectedId).parent().before(addHtml);
                }
                break;
                // 第三階層を追加
            case 'addTH':
                thName = name + '_th' + $('section[name=' + name + '] section').length
                addHtml = 
                '<section name="' + thName + '">' + 
                '<div class="row"><label for="" class="offset-1 col-2">第三階層：</label>' + 
                '<input type="text" class="form-control col-8 float-right" value="">' +
                '<button name="th" onclick="button(this,\'delete\',\'' + name + '\')" type="button" class="btn btn-info col-1">削除</button>' + 
                '</div>' + 
                '</section>';
                $(selectedId).parent().before(addHtml)
                break;
            default:
                break;
        }
    }
