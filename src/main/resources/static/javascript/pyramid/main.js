/**
 * 
 */

$(function(){
	$('#framework').change(function(){
		$.ajax({
			url: 'http://localhost:8080/api/frameworkelement/get/' + $(this).val(),
			type: 'get'
		}).done(function(data){
			frameworkElement=data
			// 既存のフレームワークの要素を削除
			$('.reason > section').remove();
			for(let index = 0; index < data.length; index++){
				//dataId = index;
				fwId = 'fw' + index;
				rationaleId = 'rationale' + index;
				evidenceId = 'evidence' + index;
				wordId = 'word' + index;
				explanationId = 'explanation' + index;
				anotherExplanationId = 'anotherExplanation' + index;
				deleteId = 'delete' + index;
				console.log(data[index].element)
				new_section = '<section class="mb-5" id="' + fwId + '">' + 
				
				'<div class="row">' + 
				'<label for="clientSecret">' + 
				data[index].element + 'に関する根拠を挙げてください' + 
				'</label>' + 
				'<input type="hidden" id="' + wordId + '" value="' + data[index].element + '"/>' + 
				'</div>' + 
				
				'<div class="row">' + 
				'<textarea id="' + explanationId + '" class="form-control" rows="3" cols="70">' + 
				'</textarea>' + 
				'</div>' + 
				
				'<div class="row">' + 
				'上記の根拠を一言で言い換えると何ですか？' + 
				'</div>' + 
				
				'<div class="row">' + 
				'<input type="text" id="' + anotherExplanationId + '" class="form-control" value=""/>' + 
				'</div>' + 
				
				'<div class="row">' + 
				'上記の根拠に対する証拠<span style="color:red">' + 
				'(事実、事例、統計、「データ、官公庁発表データ、専門家や権威者のコメントなど)</span>を書いてください' + 
				'</div>' + 
				'<section class="' + evidenceId + '">' + 
				'<div class="row">' + 
				'<textarea id="' + evidenceId + '_0" class="form-conrol" rows="3" cols="70">' + 
				'</textarea>' + 
				'</div>' + 
				'</section>' + 
				'<div class="row">' + 
				'<button type="button" class="btn btn-primary" onClick="addEvidence(' + index + ')">証拠を追加する</button>' + 
				'</div>' + 
				'</section>'
				$('.reason').append(new_section);
			}
		})
	})
});

function changeFwk(selected){
	$.ajax({
           url: 'http://localhost:8080/api/framework/get/' + $(selected).val(),
           type: 'get'
	}).done(function(data){
		$('.reason > section').remove();
		var select = document.getElementById("framework");
		$('#framework > option').remove();
		var defaultOpt = document.createElement('option');
		defaultOpt.text = '-- 使えそうなフレームワークを１つ選択してください --'
		defaultOpt.value = '0';
		select.appendChild(defaultOpt);
		
		data.forEach(function(framework){
			var option = document.createElement("option");
			option.text = framework.content;
			option.value = framework.id;
			
			select.appendChild(option);
		});
	});
}

// ファンクションに切り出すとなぜか動かない
function changeFramework(fw){
	console.log("3:" + fw);
	$.ajax({
		url: 'http://localhost:8080/api/frameworkelement/get/' + fw.value,
		type: 'get'
	}).done(function(data){
		frameworkElement=data
		// 既存のフレームワークの要素を削除
		$('.reason > section').remove();
		for(let index = 0; index < data.length; index++){
			//dataId = index;
			fwId = 'fw' + index;
			rationaleId = 'rationale' + index;
			evidenceId = 'evidence' + index;
			deleteId = 'delete' + index;
			console.log(data[index].element)
			new_section = '<section class="mb-5" id="' + fwId + '">' + 
			
			'<div class="row">' + 
			'<label for="clientSecret">' + 
			data[index].element + 'に関する根拠を挙げてください' + 
			'</label>' + 
			'</div>' + 
			
			'<div class="row">' + 
			'<textarea class="form-control" rows="3" cols="70">' + 
			'</textarea>' + 
			'</div>' + 
			
			'<div class="row">' + 
			'上記の根拠を一言で言い換えると何ですか？' + 
			'</div>' + 
			
			'<div class="row">' + 
			'<input type="text" class="form-control" value=""/>' + 
			'</div>' + 
			
			'<div class="row">' + 
			'上記の根拠に対する証拠<span style="color:red">' + 
			'(事実、事例、統計、「データ、官公庁発表データ、専門家や権威者のコメントなど)</span>を書いてください' + 
			'</div>' + 
			'<div class="row ' + evidenceId + '">' + 
			'<textarea id="' + evidenceId + '_0" class="form-conrol" rows="3" cols="70">' + 
			'</textarea>' + 
			'</div>' + 
			'<div class="row">' + 
			'<button type="button" class="btn btn-primary" onClick="addEvidence(' + index + ')">証拠を追加する</button>' + 
			'</div>' + 
			'</section>'
			$('.reason').append(new_section);
		}
	})
	console.log(select);
}

// 証拠の追加
function addEvidence(evidenceParentId){
	var section = $('.evidence' + evidenceParentId)[0];
	console.log('section.length : ' + section.children.length);
	
	var insertLine = $('.evidence' + evidenceParentId + ' textarea').length-1;
	var evidenceId = $('.evidence' + evidenceParentId + ' textarea').length;
	new_evidence = 
			'<div class="row">' + 
			'<textarea id=evidence' + evidenceParentId + '_' + evidenceId + ' class="form-conrol" rows="3" cols="70">' + 
			'</textarea>' + 
			'<button type="button" id="evidenceDelete' + evidenceParentId + '_' + evidenceId + '" class="btn btn-danger col-1" onclick="deleteEvidence(' + evidenceParentId + ', ' + evidenceId + ')">削除</button>' + 
			'</div>';
	console.log('insertLine : ' + insertLine);
	console.log('count : ' + evidenceId);
	console.log('index : ' + evidenceParentId);
	$('#evidence' + evidenceParentId + '_' + insertLine).parent().after(new_evidence);
}

// 削除ボタンが押されたときに対象の証拠を削除する
function deleteEvidence(evidenceParentId, evidenceChildId){
	
	var evidence = $('#evidence' + evidenceParentId + '_' + evidenceChildId);
	console.log('textarea : ' + evidenceParentId)
	evidence.parent().remove();
	
	var textareaList = $('textarea[id*=evidence' + evidenceParentId + '_]');
	var deleteButtonList = $('button[id*=evidenceDelete' + evidenceParentId + '_]');
	console.log('selector : ' + textareaList.length);
	
	for(let i=1; i<textareaList.length; i++){
		textareaList.eq(i).attr('id', 'evidence' + evidenceParentId + '_' + i);
	}
	
	for(let j=0; j<deleteButtonList.length; j++){
		deleteButtonList.eq(j).attr('id', 'evidenceDelete' + evidenceParentId + '_' + (j+1));
		deleteButtonList.eq(j).attr('onclick', "deleteEvidence(" + evidenceParentId + ', ' + (j+1) + ')');
		console.log('onclick(' + evidenceParentId + ', ' + (j+1) + ')');
	}
//	console.log('length : ' + obj.parentNode.parentNode.children.length);
	
	// advanceEvidenceId(obj.parentNode.getAttribute('class'));
	// advanceEvidenceId(obj);
	
	// 証拠の数
	/*var c = obj.parentNode.getAttribute('class');
	console.log('class : ' + c);
	//console.log('obj.id : ' + obj.);
	console.log('class num : ' + $('.' + c)[0].children[0].id);
	*/
}

// 証拠に割り振られたIDを振りなおす
function advanceEvidenceId(obj){
	
	var cls = obj.parentNode.getAttribute('class');
	console.log('class : ' + cls);
	console.log('parentNode : ' + obj.parentNode);
	var id = obj.parentNode.previousElementSibling.children[0].id;
	// 削除したオブジェクトをもらい、
	// そのオブジェクトの親要素を削除されている。
	// その削除された要素は操作が可能か？要調査
	// 操作可能であれば渡された要素の次の要素検索し存在していればをIDを渡された要素に上書き
	// その際上書きされたIDは逃がしておき、そのIDをまた振りなおす関数に渡す
	// 
	console.log('.evidence0 textarea');
	var evidenceList = $('.evidence0 textarea');
	console.log('evidenceList : ' + evidenceList.length);
	var changeFlg = false;
	for (let j=0; j<evidenceList.length; j++){
		if(changeFlg){
			console.log('idを更新');
			evidenceList[j].id = 'evidence0_' + j;
		}else if(evidenceList[j].id == id){
			console.log('changeFlgをtrue');
			changeFlg = true;
		}
	}

	/*var evidenceList = $('.evidence' + i + ' textarea');
	console.log(evidenceList[0]);
	console.log(evidenceList[1]);
	console.log(evidenceList.length);
	var changeFlg = false;
	for(let k=0; k<evidenceList.length; k++){
		console.log('evidence : ' + evidenceList[k].getAttribute('id'));
		if(evidenceList[k].id == 'evidence' + i + '_' + j){
			changeFlg=true;
		}
		if(changeFlg){
			evidenceList[k].id = 'evidence' + i + '_' + (j+k);
			console.log('id : ' + 'evidence' + i + '_' + (j+k));
		}
	}*/
}

function submit(){
	pyramid = {
		frameworkKindId : $('#frameworkKind').val(),
		frameworkId : $('#framework').val(),
		conclusion : $('#conclusion').val(),
		rationaleList : []
	}
	console.log("pyramid = " + pyramid);
	console.log("reason = " + $('.reason').children('section').length);
	// 根拠リストを取得
	for(let i=0; i<$('.reason').children('section').length; i++){
		rationale = {
			word : $('#word' + i).val(),
			explanation : $('#explanation' + i).val(),
			anotherExplanation : $('#anotherExplanation' + i).val(),
			pyramidId : 0,
			evidenceList : []
		}
	console.log("rationale = " + rationale);
		// 証拠リストを取得
		for(let j=0; j<$('#evidence' + i).length; j++){
			evidence = {
				explanation : $('#evidence' + i + '_' + j).val(),
				rationaleId : i
			}
			rationale.evidenceList.push(evidence);
		}
		pyramid.rationaleList.push(rationale);
	}
	var form = document.createElement("form");
	form.setAttribute("action", "/logicalthinking/mail");
	form.setAttribute("method", "post");
	document.body.appendChild(form);
	for(var param in pyramid){
		console.log("param : " + param);
		// 根拠のform作成
		if(param === 'rationaleList'){
			console.log("ifの中" + pyramid[param].length);
			for(let i=0; i<pyramid[param].length; i++){
				console.log("pyramid[param]ループの数" + pyramid[param].length);
				for(var rationaleParam in pyramid[param][i]){
					console.log("rationaleParam : " + rationaleParam);
					// 証拠のform作成
					if(rationaleParam === 'evidenceList'){
						// 証拠に値が入力されている場合
						for(let j=0; j<pyramid[param][i][rationaleParam].length; j++){
							console.log("pyramid[param][i][rationaleParam]ループの数" + pyramid[param][i][rationaleParam].length);
							for(var evidenceParam in pyramid[param][i][rationaleParam][j]){
								console.log("evidenceParam : " + evidenceParam);
								var inputEvidence = document.createElement('input');
								inputEvidence.setAttribute('type', 'hidden');
								inputEvidence.setAttribute('name', param + '[' + i + '].' + rationaleParam + '[' + j + '].' + evidenceParam);
								inputEvidence.setAttribute('value', pyramid[param][i][rationaleParam][j][evidenceParam]);
								form.appendChild(inputEvidence);
							}
						}
					}else{
						var inputRationale = document.createElement('input');
						inputRationale.setAttribute('type', 'hidden');
						inputRationale.setAttribute('name', param + '[' + i + '].' + rationaleParam);
						inputRationale.setAttribute('value', pyramid[param][i][rationaleParam]);
						form.appendChild(inputRationale);
					}
				}
			}
		}else{
			var inputRationale = document.createElement('input');
			inputRationale.setAttribute('type', 'hidden');
			inputRationale.setAttribute('name', param);
			inputRationale.setAttribute('value', pyramid[param]);
			form.appendChild(inputRationale);
		}
	}
	form.submit();
}
// フレームワーク分類のプルダウンを変更時にフレームワークのプルダウンの中身を取得
/*$('[name="fwk"]').change(function () {
         //clarify = $('input[name="clarify"]').val() == 1 ? '原因(理由)' : '方法';
	$.ajax({
           url: 'http://localhost:8080/api/framework/get/' + $(this).val(),
           type: 'get'
	}).done(function(data){
		var select = document.getElementById("fwList");
		//console.log(data);
		console.log(select);
		data.forEach(function(framework){
			var option = document.createElement("option");
			option.text = framework.content;
			option.value = framework.id;
			
			select.appendChild(option);
			//console.log(framework.content);
		});
	});
});*/

// フレームワーク選択時に対応した内容で入力部分のdisplay:noneを外す
//$('[name="fw"]').change(function(){
	
//})

