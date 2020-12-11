//import * as UrlUtils from '../util/util.js';
//
//const urlUtil = new UrlUtils.Url;
//const pyramidUrlUtil = new UrlUtils.PyramidUrl;

let url = location.href;
let path = location.pathname;
let uri = url.replace(path, "");
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
		
		$.ajax({
			url: uri + "/logicalthinking/logictree/get",
			type: 'get',
		}).done(function(data){
			// 成功時の処理
			if(data != ''){
				// 画面にhtml要素を追加する
				addHTML(data)
			}
		});
		
    });
    
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
        FHname = '1-' + index;
        // 「第二階層を追加」ボタンを追加
        copyAnotherWord = firstHierarchy.anotherWord !== `` ? firstHierarchy.anotherWord : firstHierarchy.word 
        targetFrameworkElementId = targetFrameworkElements[index].id;
        fwId = 'fw' + targetFrameworkElementId;
        fhId = '1-' + targetFrameworkElementId;
        frameWorkElement = firstHierarchy.word;
       
        new_list = createFirstHierarchyHtml(fwId, index, fhId, copyAnotherWord, frameWorkElement, "");

        $('#hierarchy').append(new_list);

        // 第二階層を追加
         //TODO 今, idが入っているため, このif文は意味がない
        for(let index2 = 0; index2 < firstHierarchy.secondHierarchyList.length; index2++){
            secondHierarchy = firstHierarchy.secondHierarchyList[index2];
            createInitailHierarchy(index2, 2, secondHierarchy, FHname);
            for(let index3 = 0; index3 < secondHierarchy.thirdHierarchyList.length; index3++){
                thirdHierarchy = secondHierarchy.thirdHierarchyList[index3]
                createInitailHierarchy(index3, 3, thirdHierarchy, shName);
             }
         }
      }
      addFH = createAddFHButton();
      $('#hierarchy').append(addFH)
      createInsistenceOption();
      $('#insistence').val(data.insistence);
}

function createInitailHierarchy(index,currentHierarchyIndex,currentHierarchy, preHierarchyName){
    currentHierarchyName = preHierarchyName + '_3-' + index;
    value = currentHierarchy.explanation !== null ? currentHierarchy.explanation : ``; 
    hierarchyHTML = createHierarchyHtml(currentHierarchyIndex, currentHierarchyName, value);
    $(`section[name=${preHierarchyName}]`).children(`div[name=add-${currentHierarchyIndex}-hierarchy]`).before(hierarchyHTML);
}

$(function(){
	// 主張の選択肢を追加
	$(document).on("blur", ".row2", function(){
		createInsistenceOption();
	});
	
	// 「今回の課題を明らかにする」の各項目の文字数チェック
	$(document).on("blur", "#partnerWants, #currentState", function(){
		let idName = $(this).attr(`id`);
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

// 送信するデータのバリデーションチェックをします.
function validateValue(){
	 let validateOk = true;
	
	// 「相手が欲しいもの〜」の文字数チェック
	 let partnerWants = $('#partnerWants').val();
	 if(partnerWants.length === 0|| partnerWants.length > 100){
		$(`#partnerWantsError`).text('100文字以内で入力してください');
		validateOk = false;
	  }
	
	// 「あなたの現状は〜」の文字数チェック
	let currentState = $('#currentState').val();
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

/**
 * マインドマップページに遷移する.
 */
const createLogicTreeMap = () => {    
    //ロジックツリー(第一階層から第三階層までの作成)の作成を行う.
    const logicTree = createLogicTreeData();
    // json化
    const param = JSON.stringify(logicTree);
    //エンコード
    const encoded = encodeURIComponent(param)
    //エンコードしたJSONをparamとして遷移させる
    location.href= uri + `/logicalthinking/mindmap?json=${encoded}`;
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
        // ex. 1-0, 1-1 ...
        fHName = '1-' + index;
        // 第一階層の値を取得
        firstHierarchy = {
            word : $('section[name=' + fHName + '] div input').val(),
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
            sHName = fHName + '_2-' + index2;
            // 第二階層の値を取得
            secondHierarchy = {
                explanation : $('section[name=' + sHName + '] input').val(),
                displayOrder : index2 + 1,
                thirdHierarchyList : []
            }
            // 第三階層の数を取得 (第二階層で取得したnameの子要素のsectionの数を取得)
            for(let index3 = 0; index3 < $('section[name=' + sHName + '] section').length; index3++){
                tHName = sHName + '_3-' + index3;
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
}

//主張の選択肢を追加.
function createInsistenceOption(){
		// 主張の選択肢を削除
		$('#insistence').children().remove();
		let select = $('#insistence');
		// デフォルト値を設定
		let defalut = `-- 主張を１つ選択してください --`;
		let option = $('<option>', { text:defalut, value:`` });
		select.append(option);
		
		//　各理由の最下層の入力値を選択肢に設定
		let target = $(`.row2`);
		target.each(function(){
			let row3Val = $(this).find(`.row3-input`);
			if(0 !== row3Val.length){
				// 最下層が第三階層の場合
				let anyValueInput = false
				row3Val.each(function(){
					let val = $(this).val()
					if(`` !== val){
						option = $('<option>', { text: $(this).val(), value:$(this).val() });
						select.append(option);
						anyValueInput = true;
					}
				});
				if(!anyValueInput){
					// 第三階層の入力値が存在しない場合は第二階層の入力値を反映させる。
					 val = $(this).find(`.row2-input`).val();
					if(`` !== val){
						option = $('<option>', { text:val, value:val });
						select.append(option);
					}
				}
			}else{
				//　最下層が第二階層の場合
				let val = $(this).find(`.row2-input`).val();
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
       fhId = '1-' + dataId;
       shId = '2-' + dataId;
       copyAnotherWord = data[index].element;
       frameWorkElement = data[index].element;
       
       new_list = createFirstHierarchyHtml(fwId, index, fhId, copyAnotherWord,frameWorkElement, "");
       $('#hierarchy').append(new_list);
	   // 「第二階層を追加」ボタンを追加
	   name = '1-' + index;
	   shName = name + '_2-' + $('.fw[name=' + name + '] section').length
	   addHtml =  createHierarchyHtml(2, shName, '');
	   $('#' + fhId).after(addHtml);
	
     }
   
   	
     addFH = createAddFHButton();
     $('#hierarchy').append(addFH)
}

/*
 * 追加, 削除ボタンを押下場合にイベント発生
 * selectedId: 押下位置を取得　
 * optiin: add(追加), delete(削除)
 * name: 追加したい要素名
 * */
function changeHierarchy(selectedId, option, name, hierarchyIndex){
	let firstHierarchyIndex = $('section.fw').length
	//仮の値
	let secondHierarchyIndex = 0
    switch (option) {
        // 削除
        case 'delete':
        	selectedId.parent().parent().remove();
            break;
        // 第一階層を追加
        case 'add-1-hierarchy':
        	targetFrameworkElementId = $(`#fwradio option:selected`).val();
        	
        	fwId = 'fw' + targetFrameworkElementId;
        	index = $('.fw').length
        	fhId = '1-' + targetFrameworkElementId;
            copyAnotherWord = firstHierarchy.anotherWord !== `` ? firstHierarchy.anotherWord : firstHierarchy.word;
            name = '1-' + $('.fw').length;
            considerArea = '<br><div><input onkeyup="keyup(this)" type="text" name="' + name + '">' + 
            'について検討します</div>';

            
            //第一階層を設定
            addHtml = createFirstHierarchyHtml(fwId, index, fhId, copyAnotherWord, "", considerArea);
            $(selectedId).parent().before(addHtml);
            
            // 第二階層を設定
            name = '1-' + index;
     	   	shName = name + '_2-' + $('.fw[name=' + name + '] section').length
     	   	addHtml =  createHierarchyHtml(2, shName, '');
     	   	$('#' + fhId).after(addHtml);
            
            break;
        case 'add':
            // 各階層を追加します。
            hierarchyName = name + `_${hierarchyIndex}-` + $('.fw[name=' + name + '] section').length;
            addHtml =  createHierarchyHtml(hierarchyIndex, hierarchyName, '');
            $(selectedId).parent().before(addHtml);
            break;
        default:
            break;
    }
}

/*
 * 第一階層の要素を作成します.
 * fwId: フレームワークのID
 * index: 番号
 * fhId: 第一階層のID
 * copyAnotherWord: 言い換え
 * frameWorkElement: フレームワークの要素
 * considerArea: 検討領域のHTML構造（第一階層を追加する際の「〇〇について検討します」の部分）
 * */
function createFirstHierarchyHtml(fwId, index, fhId, copyAnotherWord, frameWorkElement, considerArea){
	anotherWordText = createAnotherWordHtml(frameWorkElement, index, copyAnotherWord);
	
     addFirstHierarchyHtml = 
    `<section class="fw" id="${fwId}" name="1${index}">` + 
    considerArea + 
    anotherWordText + 
    `<div id="${fhId}" class="row">` + 
    `<label for="" class="col-11">` +
    `<font class="copyAnotherWord">` + 
    copyAnotherWord + 
   `</font>` + 
    `に関する具体的な【<font class="clarify">${clarify}</font>】を挙げてください` + 
    `</label>` +
    `<input type="hidden" value="${copyAnotherWord}">` + 
    `<button type="button" onclick="changeHierarchy($(this), "delete", "","")" class="btn btn-danger col-1">削除</button>` + 
    `</div>` +
    // ボタンの追加
    `<div name="add-2-hierarchy" class="row">` + 
    `<button onclick="changeHierarchy(this, 'add', 'fh${index}' '2')" class="btn btn-primary col-3 mb-2">第二階層を追加する</button>` + 
    `</div>` + 
    `</section>`;
     return addFirstHierarchyHtml;
}

/*
 * 「〇〇」を言い換えるとのHTML構造を作成
 * 例) 第三階層の要素を追加
 * frameWorkElement : 
 * index : 
 * anotherWord : 
 * */
function createAnotherWordHtml(frameWorkElement, index, anotherWord){
	 anotherWordText = 
	 `<br>` + 
     `<div class="row">` +
     `<label for="">「<font name="word">${frameWorkElement}</font>」を言い換えると何ですか？</label>` + 
     `</div>` + 
     `<div class="row">` + 
     `<input type="text" class="another-word-list form-control mb-5" value="${anotherWord}">` + 
     `</div>`;
	 return anotherWordText;
}

// 第一階層追加ボタンを作成
function createAddFHButton(){
	return addFH = '<div class="row">' + 
	'<button onclick="changeHierarchy(this, `add-first-hierarchy`, ``)" type="button" class="btn btn-danger col-3 mb-5">第一階層を追加する</button>' + 
	'</div>';
}

/*
 * 第n階層の要素を作成します.
 * 例) 第三階層の要素を追加
 * hierarchyIndex : 3
 * hierarchyName : fh0_sh0_th0
 * hierarchyButtonName : third-hierarchy
 * hierarchyNextButtonName : forth-hierarchy
 * */
function createHierarchyHtml(hierarchyIndex, hierarchyName, inputValue){
    let hierarchyNextIndex = hierarchyIndex + 1;
    addHierarchyButton = '';

    if(8 >= hierarchyNextIndex){
        addHierarchyButton = `<div name="add-${hierarchyNextIndex}-hierarchy" class="row">` + 
        `<button onclick="changeHierarchy(this, 'add','${hierarchyName}', ${hierarchyNextIndex})" type="button" class="btn btn-info col-3 mb-2">第${hierarchyNextIndex}階層を追加</button>` + 
        `</div>`;
    }
    
	 addHierarchyHtml = 
		`<section class="row${hierarchyIndex}" name="${hierarchyName}">` + 
		`<div class="row"><label for="" class="col-2">第${hierarchyIndex}階層：</label>` + 
	    `<input type="text" class="form-control col-9 row${hierarchyIndex}-input" value="${inputValue}" onblur="createInsistenceOption(this)">` + 
	    `<button onclick="changeHierarchy($(this),'delete', '${hierarchyName}', '')" type="button" class="btn btn-primary col-1">削除</button>` + 
	    `</div>` + 
	    addHierarchyButton + 
        `</section>`;
    
    return addHierarchyHtml;
}
