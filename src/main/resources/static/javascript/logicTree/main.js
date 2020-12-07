//import * as UrlUtils from '../util/util.js';
//
//const urlUtil = new UrlUtils.Url;
//const pyramidUrlUtil = new UrlUtils.PyramidUrl;

var url = location.href;
var path = location.pathname;
var uri = url.replace(path, "");
let frameworks;
let frameworkElements;
const URL = uri + '/logicalthinking/logictree/api';

// 初期描画時の処理
$(document).ready( function(){
	$.ajax({
		url: uri + "/api/framework/get",
//		url: urlUtil.uri + pyramidUrlUtil.apiFrameworkUrl,
		type: 'get',
	}).done(function(data){
        frameworks = data['Framework'];
		frameworkElements = data['FrameworkElement'];
    })
    
    $.ajax({
		url: uri + "/logicalthinking/logictree/get",
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
    $('#partnerWantsForLogicTree').val($('#partnerWants').val());
    // あなたの現場
    $('#currentState').val(data.currentState);
    $('#copyCurrentState').html($('#currentState').val());
    $('#currentStateForLogicTree').val($('#currentState').val());
    // 説明したいもの
    $('input[name="clarify"]').eq(data.descriptionType == 1 ? 1 : 2).prop('checked', true);
    changeClarify($('input[name="clarify"]:checked'));
    // フレームワーク
    $('[name="fw"]').val(data.frameworkId);
    $('#logicTreeId').val(data.id)
    // 記述用の値(原因 or 方法)を取得
    clarify = $('input[name="clarify"]:checked').parent().text();
    // 第一階層を追加 (取得した要素分を追加)
	frameworkId = data.frameworkId;
	targetFrameworkElements = frameworkElements[frameworkId];
    for (let index = 0; index < data.firstHierarchyList.length; index++) {
        firstHierarchy = data.firstHierarchyList[index];
        name = 'fh' + index;
        
        // 「第二階層を追加」ボタンを追加
        copyAnotherWord = firstHierarchy.anotherWord !== `` ? firstHierarchy.anotherWord : firstHierarchy.word 
        
        targetFrameworkElementsId = targetFrameworkElements[index].id;
        fwId = 'fw' + targetFrameworkElementsId;
        fhId = 'fh' + targetFrameworkElementsId;
        deleteFh = 'deleteFh' + targetFrameworkElementsId;
        
        new_list = createFirstHierarchyHtml(fwId, index, fhId, data, deleteFh, copyAnotherWord);
        
        frameWorkElement = firstHierarchy.word;
        
        anotherWordText = createAnotherWordHtml(frameWorkElement, index, copyAnotherWord);

        // 「〇〇」を言い換えるとを追加
        $('#hierarchy').append(new_list);
        $('#hierarchy').children('section[name=fh'+ index + ']').before(anotherWordText);

        // 第二階層を追加
         //TODO 今, idが入っているため, このif文は意味がない
         if(firstHierarchy.secondHierarchyList.length != null){ 
             for(let index2 = 0; index2 < firstHierarchy.secondHierarchyList.length; index2++){
               secondHierarchy = firstHierarchy.secondHierarchyList[index2];
               // 上記の様にhtmlの追加をしないためにexplanationがnullの場合はbreak
               if(secondHierarchy.explanation == null) break;
               shName = name + '_sh' + index2;
               
               value = secondHierarchy.explanation !== null ? secondHierarchy.explanation : ``; 
               
//               addSHSection　= createSecondHierarchyHtml(shName, firstHierarchyIndex, name, secondHierarchyIndex);

               addSHSection = '<section class="row2" name="' + shName + '">' + 
               '<div class="row">' + 
               '<label for="" class="col-2">第二階層：</label>' + 
               '<input type="text" class="form-control col-9 row2-input" value="' + value + '">' + 
               '<button name="sh" onclick="changeHierarchy(this,\'delete\',\'' + name + '\')" type="button" class="btn btn-primary col-1">削除</button>' + 
               '</div>' + 
               '<div class="row" name="addTH">' + 
               '<button name="th" onclick="changeHierarchy(this, \'addTH\',\'' + shName + '\')" type="button" class="btn btn-info offset-1 col-3 mb-2">第三階層を追加</button>' + 
               '</div>' + 
               '</section>';
               $('section[name=' + name + ']').children('div[name=addSH]').before(addSHSection);

               for(let index3 = 0; index3 < secondHierarchy.thirdHierarchyList.length; index3++){
                    thirdHierarchy = secondHierarchy.thirdHierarchyList[index3]
                    thName = shName + '_th' + index3;
                    value = thirdHierarchy.explanation !== null ? thirdHierarchy.explanation : ``; 
                    addTHSection =  createHierarchyHtml(3, thName, 'third-hierarchy', 'forth-hierarchy');


                    $('section[name=' + shName + ']').children('div[name=addTH]').before(addTHSection);
               }
             }
         }
      }
      addFH = '<div class="row">' + 
          '<button id="addFHButton" onclick="changeHierarchy(this, `addFH`, ``)" type="button" class="btn btn-danger col-3 mb-5">第一階層を追加する</button>' + 
          '</div>';
      $('#hierarchy').append(addFH)
      createInsistenceOption();
      $('#insistence').val(data.insistence);
}

// 送信するデータのバリデーションチェックをします.
function validateValue(){
	 var validateOk = true;
	
	// 「相手が欲しいもの〜」の文字数チェック
	 var partnerWants = $('#partnerWants').val();
	 if(partnerWants.length === 0|| partnerWants.length > 100){
		$(`#partnerWantsError`).text('100文字以内で入力してください');
		validateOk = false;
	  }
	
	// 「あなたの現状は〜」の文字数チェック
	var currentState = $('#currentState').val();
	if(currentState.length === 0 || currentState.length > 100){
		$(`#currentStateError`).text('100文字以内で入力してください');
		validateOk = false;
	  }
	
	if($('[name=insistence]').val() === ``){
		$(`#insistence-error`).text('主張を選択してください');
		validateOk = false;
	}
	
	if(!validateOk){
		$(`#submit-value-error`).text('エラー入力項目があります。入力欄上のエラーメッセージをご確認ください');
	}
	return validateOk;
}
 
//登録処理
//Step2(ピラミッド構造=PREP)の作成へ進むボタンを押した際の挙動
function register(){
	// バリデーション
	if(!validateValue()){
		return;
	}
    
    logicTree = createLogicTreeData();
    
    // json化
    var param = JSON.stringify(logicTree);
    console.log(param)
    $.ajax({
        url: URL + '/upsert',
        type: 'post',
        dataType: 'json',
        data: param,
        contentType: "application/json; charset=utf-8"
    }).done(function(data){
        // 登録したidを次のページに引き継ぐ
    	location.href= uri + '/logicalthinking/pyramid';
    }).fail(function(jqXHR, textStatus, errorThrown){
    	errors = jqXHR.responseJSON.errors;
    	errors.forEach(function(error){
    		target = error.field;
    		if(`insistence` === target){
    			$(`#insistence-error`).text('主張を選択してください');
    		}else{
    			$(`#${target}Error`).text('100文字以内で入力してください');
    		}
    	});
    	$(`#submit-value-error`).text('エラー入力項目があります。入力欄上のエラーメッセージをご確認ください');
    });
}

//登録するロジックツリーの情報を取得します.
function createLogicTreeData(){
	// ロジックツリーの値を取得
    logicTree = {
        // 更新処理ではなく, 削除からの新規作成のためidをコメントアウト
        // id : $('#logicTreeId').val(),
        partnerWants : $('#partnerWants').val(),
        currentState : $('#currentState').val(),
        descriptionType : $('input[name="clarify"]').val(),
        frameworkId : $('[name="fw"]').val(),
        insistence : $('#insistence option:selected').val(),
        firstHierarchyList : []
    }
    
	// 第一階層の数を取得
    for(let index = 0; index < $('.fw').length; index++){
        // ex. fh0, fh1 ...
        fHName = 'fh' + index;
        // 第一階層の値を取得
        firstHierarchy = {
            word : $('section[name=' + fHName + '] div div input').val(),
            //name変更位置
            anotherWord : $('section[name=' + fHName + '] input').val(),
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
    return logicTree;
}

//「第一階層を追加する」の後処理.
function keyup(thisEle){
    // sectionのnameを取得
    name = $(thisEle).attr('name');
    $('section[name='+ name + '] font[name=word]').html($(thisEle).val())
    $('section[name='+ name + '] input[name=word]').val($(thisEle).val())
    //追加
    $('section[name='+ name + '] input[name=additionalWord]').val($(thisEle).val())
}

//主張の選択肢を追加.
function createInsistenceOption(){
		// 主張の選択肢を削除
		$('#insistence').children().remove();
		var select = $('#insistence');
		// デフォルト値を設定
		var defalut = `-- 主張を１つ選択してください --`;
		var option = $('<option>', { text:defalut, value:`` });
		select.append(option);
		
		//　各理由の最下層の入力値を選択肢に設定
		var target = $(`.row2`);
		target.each(function(){
			var row3Val = $(this).find(`.row3-input`);
			if(0 !== row3Val.length){
				// 最下層が第三階層の場合
				row3Val.each(function(){
					var val = $(this).val()
					if(`` !== val){
						option = $('<option>', { text: $(this).val(), value:$(this).val() });
						select.append(option);
					}
				});
			}else{
				//　最下層が第二階層の場合
				var val = $(this).find(`.row2-input`).val();
				if(`` !== val){
					option = $('<option>', { text:val, value:val });
					select.append(option);
				}
			}
		});
}

//原因(理由)/方法のラジオボタンを選択した時.
function changeClarify(target){
	if($(target).val() == 1){
        // 原因(理由)を選択
        $('#reason').css("display", "block");
        $('#method').css("display", "none");
        $('.clarify').html('原因(理由)');
    } else if($(target).val() == 2) {
        // 方法を選択
        $('#reason').css("display", "none");
        $('#method').css("display", "block");
        $('.clarify').html('方法');
    }
	$('descriptionTypeForLogicTree').val($(target).val())
}

$(function(){
	// 主張の選択肢を追加
	$(document).on("blur", ".row2", function(){
		createInsistenceOption();
	});
	
	// 「今回の課題を明らかにする」の各項目の文字数チェック
	$(document).on("blur", "#partnerWants, #currentState", function(){
		var idName = $(this).attr(`id`);
		if($(this).val().length > 100){
			$(`#${idName}Error`).text('100文字以内で入力してください');
		  }else{
			  $(`#${idName}Error`).text('');
		  }
    });
	
    // 「相手が欲しいもの」の入力結果を反映
    $( document ).on( 'keyup', '#partnerWants' , function(){ 
        $('#copyPartnerWants').html($( this ).val());
        //ロジックツリー表示のため追加
        $('#partnerWantsForLogicTree').val($(this).val());
    });
    // 「あなたの現場」の入力結果を反映
    $( document ).on( 'keyup', '#currentState' , function(){ 
        $('#copyCurrentState').html($( this ).val());
      //ロジックツリー表示のため追加
        $('#currentStateForLogicTree').val($(this).val());
    });
    // 言い換えの入力結果を反映
    $( document ).on( 'keyup', '.another-word-list' , function(){ 
        $(this).parent().next().find('.copyAnotherWord').html($( this ).val());
    });
    
    // ラジオボタンが変更されたらイベント発生
    // class="clarify"に対して対象の文言をhtmlで追加
    $('input[name="clarify"]').change(function () {
    	changeClarify(this);
    });
      // name="fw"の値が変更されたらイベント発生
      // ドロップダウンの値が変更されたら, 変更後の値に対応したframeworkElementを取得
     $('[name="fw"]').change(function () {
    	 changeFrameWork(this);
    });
});

// フレームワークを選択した時
function changeFrameWork(target){
	// フレームワークIDを取得
	frameworkId = $(target).val();
   // 記述用の値(原因 or 方法)を取得
	clarify = $('input[name="clarify"]:checked').parent().text();
    data = frameworkElements[frameworkId];
     
     // 既存のフレームワークの要素を削除
     $('#hierarchy > div').remove();
     $('#hierarchy > .fw').remove();
     $('#hierarchy > br').remove();
       
   // 第一階層を追加 (取得した要素分を追加)
   for (let index = 0; index < data.length; index++) {
       dataId = data[index].id;
       fwId = 'fw' + dataId;
       fhId = 'fh' + dataId;
       deleteFh = 'deleteFh' + dataId;
       shId = 'sh' + dataId;
       copyAnotherWord = data[index].element;
       
       new_list = createFirstHierarchyHtml(fwId, index, fhId, data, deleteFh, copyAnotherWord);

       $('#hierarchy').append(new_list);
         // 「第二階層を追加」ボタンを追加
         
         name = 'fh' + index;
         
         shName = name + '_sh' + $('.fw[name=' + name + '] section').length

         addHtml =  createHierarchyHtml(2, shName, 'second-hierarchy', 'third-hierarchy');
         
         if (typeof fhId === 'string') {
             // 第二階層入力時に「第三階層を追加する」ボタンを追加する
             $('#' + fhId).after(addHtml);
         } else if (typeof fhId === 'object'){
             $(fhId).parent().before(addHtml);
         }

         frameWorkElement = data[index].element;
         // 「〇〇」を言い換えるとを追加
         anotherWordText = createAnotherWordHtml(frameWorkElement, index, '');

         $('#fw' + data[index].id).prepend(anotherWordText)
     }
     addFH = 
 	'<div class="row">' + 
     '<button id="addFHButton" onclick="changeHierarchy(this, `addFH`, ``)" type="button" class="btn btn-danger col-3 mb-5">第一階層を追加する</button>' + 
     '</div>';
     $('#hierarchy').append(addFH)
}

// 追加, 削除ボタンを押下場合にイベント発生
// selectedId: 押下位置を取得
// optiin: add(追加), delete(削除)
// name: 追加したい要素名
function changeHierarchy(selectedId, option, name){
	let firstHierarchyIndex = $('section.fw').length
	//仮の値
	let secondHierarchyIndex = 0
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
                        case 'second-hierarchy':
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
                        case 'third-hierarchy':
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
            clarify = $('input[name="clarify"]:checked').parent().text();
            secondHierarchyButton = 
            '<div class="row">' + 
            '<button onclick="changeHierarchy(this, \'addSh\', \'' + name + '\')" type="button" class="btn btn-primary col-3 mb-2">第二階層を追加する</button>' + 
            '</div>'
            
            // 「〇〇」について検討します
            
            inputHeading = '<br><div><input onkeyup="keyup(this)" type="text" name="' + name + '">' + 
            'について検討します</div>'
            
            // 「〇〇」を言い換えるとを追加
            anotherWordText = '<br>' + 
            '<div class="row">' + 
            //追加部分
            '<input type="hidden" name="additionalWord">' +
            '<label for="">「<font name="word"></font>」を言い換えると何ですか？</label>' + 
            '</div>' + 
            '<div class="row">' + 
            '<input name="firstHierarchyList[' + firstHierarchyIndex + '].anotherWord" type="text" class="another-word-list form-control mb-5" value="">' + 
            '</div>';
            
            var option = 'addSh';
            
            shName = name + '_sh' + $('.fw[name=' + name + '] section').length
            
            addShHtml =  createHierarchyHtml(2, shName, 'second-hierarchy', 'third-hierarchy');

            addHtml = '<section class="fw" name="' + name + '">' + 
            inputHeading + 
            anotherWordText + 
            '<div>' + 
            '<div class="row">' + 
            '<label for="" class="col-11">' +
            '「<font class="copyAnotherWord"></font>」'+ 'に関する具体的な【<font class="clarify">' + clarify + '</font>】を挙げてください' + 
            '</label>' +
            '<input id="framework-element" type="hidden" value="">' +
            '<button onclick="changeHierarchy(this, \'delete\')" name="fh" type="button" class="btn btn-danger col-1">削除</button>' + 
            '</div>' +
            '</div>' + 
            addShHtml + 
            secondHierarchyButton +
            '</section>';
            
            $(selectedId).parent().before(addHtml);
            
            // 「第二階層を追加」ボタンを追加
            break;
        // 第二階層を追加
        case 'addSh':
            shName = name + '_sh' + $('.fw[name=' + name + '] section.row2').length

            addHtml　= createSecondHierarchyHtml(shName, firstHierarchyIndex, name, secondHierarchyIndex);

            if (typeof selectedId === 'string') {
                // 第二階層入力時に「第三階層を追加する」ボタンを追加する
                $('#' + selectedId).after(addHtml);
            } else if (typeof selectedId === 'object'){
                $(selectedId).parent().before(addHtml);
            }
            break;
            // 第三階層を追加
        case 'add-third-hierarchy':
            thName = name + '_th' + $('section[name=' + name + '] section').length;
            addHtml =  createHierarchyHtml(3, thName, 'third-hierarchy', 'fourth-hierarchy');

            $(selectedId).parent().before(addHtml)
            break;
        default:
            break;
    }
}

//第一階層の要素を作成します.
function createFirstHierarchyHtml(fwId, index, fhId, data, deleteFh, copyAnotherWord){
     addFirstHierarchyHtml = 
    '<section class="fw" id="'+ fwId +'" name="fh' + index +'">' + 
    // 第一階層を追加ボタン押下時
//    '<input id="framework-element" type="hidden" name="fh' + index + '_id" value="' + firstHierarchy.id + '">' +
    '<div id="' + fhId + '">' + 
    '<div class="row">' + 
    '<label for="" class="col-11">' +
    `<font class="copyAnotherWord">` + 
    copyAnotherWord + 
   `</font>` + 
    'に関する具体的な【<font class="clarify">' + clarify + '</font>】を挙げてください' + 
    '</label>' +
    '<input name="elementList" type="hidden" value="' + copyAnotherWord +  '">' + 
    '<button name="fh" type="button" onclick="changeHierarchy(this, \'delete\', \'\')" id="' + deleteFh + '" class="btn btn-danger col-1">削除</button>' + 
    '</div>' +
    '</div>' +
    // ボタンの追加
    '<div name="addSH" class="row">' + 
    '<button onclick="changeHierarchy(this, \'addSh\', \'fh' + index + '\')" class="btn btn-primary col-3 mb-2">第二階層を追加する</button>' + 
    '</div>' + 
    '</section>';
     return addFirstHierarchyHtml;
}

function createAnotherWordHtml(frameWorkElement, index, anotherWord){
	 anotherWordText = '<br>' + 
     '<div class="row">' +
     '<label for="">「' + frameWorkElement + '」を言い換えると何ですか？</label>' + 
     '</div>' + 
     '<div class="row">' + 
     //name変更位置
     '<input name="firstHierarchyList[' + index + '].anotherWord" type="text" class="another-word-list form-control mb-5" value="' + anotherWord + '">' + 
     '</div>';
	 return anotherWordText;
}

/*
 * 第n階層の要素を作成します.
 * 例) 第三階層の要素を追加
 * hierarchyIndex : 3
 * hierarchyName : fh0_sh0_th0
 * hierarchyButtonName : third-hierarchy
 * hierarchyNextButtonName : forth-hierarchy
 * */
function createHierarchyHtml(hierarchyIndex, hierarchyName, hierarchyButtonName, hierarchyNextButtonName){
	// hierarchyIndex : 1
	// hierarchyName : fh0_sh0_th2
	// hierarchyButtonName : fh
	let hierarchyNextIndex = hierarchyIndex + 1;
	
	
	return addHierarchyHtml = 
		`<section class="row${hierarchyIndex}" name="${hierarchyName}">` + 
		`<div class="row"><label for="" class="col-2">第${hierarchyIndex}階層：</label>` + 
	    `<input type="text" class="form-control col-9 row2-input" value=""　onblur="createInsistenceOption(this)">` + 
	    `<button name="${hierarchyButtonName}" onclick="changeHierarchy(this,'delete', '${hierarchyName}')" type="button" class="btn btn-primary col-1">削除</button>` + 
	    `</div>` + 
	    `<div class="row">` + 
	    `<button name="${hierarchyNextButtonName}" onclick="changeHierarchy(this, 'add-${hierarchyNextButtonName}','${hierarchyName}')" type="button" class="btn btn-info col-3 mb-2">第${hierarchyNextIndex}階層を追加</button>` + 
	    `</div>` + 
	    `</section>`;
}
