import * as Utils from '../util/util.js';

const urlUtil = new Utils.Url;
const pyramidUrlUtil = new Utils.PyramidUrl;
let frameworks;
let frameworkElements;

let errors = {
	selectedError: [],
	pyramidError: [],
	rationalError: [],
	evidenceError: [],
}

$(document).ready(function () {
	$.ajax({
		url: urlUtil.uri + pyramidUrlUtil.apiFrameworkUrl,
		type: 'get',
	}).done(function (data) {
		// 成功時の処理
		frameworks = data['Framework'];
		frameworkElements = data['FrameworkElement'];
		$.ajax({
			url: urlUtil.uri + pyramidUrlUtil.getOldPyramidUrl,
			type: 'get',
		}).done(function (data) {
			if (data['Pyramid'] != undefined) {
				// 成功時の処理
				addHTML(data['Pyramid']);
			}
		})
	})

});

function addRationale(rationale) {
	$('.reason > section').remove();
	let manualInput = ''
	if ($('#framework option:selected').text() === 'その他(手動入力)') {
		rationale = [{
			element: "",
			frameworkId: null , 
			id: null,
			word: "",
			explanation: "",
			anotherExplanation: "",
			evidenceList: [{explanation: ""}]
		}]
	}
	for (let index = 0; index < rationale.length; index++) {
		const rationaleObject = {
			word: rationale[index].word == undefined ? rationale[index].element : rationale[index].word,
			explanation: rationale[index].explanation == undefined ? "" : rationale[index].explanation,
			anotherExplanation: rationale[index].anotherExplanation == undefined ? "" : rationale[index].anotherExplanation,
			evidenceList: rationale[index].evidenceList == undefined ? [{explanation: ""}] : rationale[index].evidenceList,
		}
		if ($('#framework option:selected').text() === 'その他(手動入力)') {
			manualInput = `<label>根拠を挙げる要素を入力してください</label>` +
				`<input id='manualInput${index}' data-manualinputid=${index} class='form-control' type='text'/>`
		}
		const fwId = `fw${index}`;
		const evidenceId = `evidence${index}`;
		const wordId = `word${index}`;
		const explanationId = `explanation${index}`;
		const anotherExplanationId = `anotherExplanation${index}`;
		let new_section = '<section class="mb-4" id="' + fwId + '">' +
			'<div class="row">' +
			manualInput +
			`<label id="clientSecret${index}" for="clientSecret">` +
			rationaleObject.word + 'に関する根拠を挙げてください' +
			'</label>' +
			'<input type="hidden" id="' + wordId + '" value="' + rationaleObject.word + '"/>' +
			'</div>' +

			'<div class="row">' +
			'<textarea id="' + explanationId + '" class="form-control" rows="3" cols="70">' +
			rationaleObject.explanation +
			'</textarea>' +
			'</div>' +

			'<div class="row">' +
			'上記の根拠を一言で言い換えると何ですか？' +
			'</div>' +

			'<div class="row">' +
			'<input type="text" id="' + anotherExplanationId + '" class="form-control" value="' + rationaleObject.anotherExplanation + '"/>' +
			'</div>' +

			'<div class="row">' +
			'上記の根拠に対する証拠<span style="color:red">' +
			'(事実、事例、統計、「データ、官公庁発表データ、専門家や権威者のコメントなど)</span>を書いてください' +
			'</div>' +
			'<section id="' + evidenceId + '">';
		for (let index2 = 0; index2 < rationaleObject.evidenceList.length; index2++) {
			const evidenceList = rationaleObject.evidenceList;
			new_section += '<div class="row">' +
				'<textarea id="' + evidenceId + '_' + index2 + '" class="form-control" rows="3" cols="70">' +
				evidenceList[index2].explanation +
				'</textarea>';
			if (index2 != 0) {
				new_section += '<button type="button" id="evidenceDelete' + index + '_' + index2 + '" data-evidenceparentid="' + index + '" data-evidencechildid="' + index2 + '" class="btn btn-danger col-1">削除</button>';
			};
			new_section += '</div>';
		}
		new_section += '</section >' +
			'<div class="row">' +
			'<button id="addEvidence' + index + '" type="button" class="btn btn-primary" data-evidenceparentid="' + index + '">証拠を追加する</button>' +
			'</div>' + 
			'<div class="row">' +
			`<button id="delete_reason${index}" data-evidenceparentid="${index}" type="button" class="btn btn-danger">根拠の削除</button>` +
			'</div>';
		new_section += '</section>';
		$('.reason').append($(new_section));
	}
	const addButton = '<div class="row mb-3"><button id="add_reason" class="btn btn-primary" type="button">根拠の追加</button></div>'
	$('.reason').append($(addButton));
}

function addHTML(data) {
	$("#frameworkKind").val(data['frameworkKindId']);
	const framework = frameworks[$("#frameworkKind").val()];
	$('.reason > section').remove();
	const select = document.getElementById("framework");
	$('#framework > option').remove();
	const defaultOpt = document.createElement('option');
	defaultOpt.text = '-- 使えそうなフレームワークを１つ選択してください --'
	defaultOpt.value = '0';
	select.appendChild(defaultOpt);

	framework.forEach(function (val) {
		const option = document.createElement("option");
		option.text = val.content;
		option.value = val.id;
		select.appendChild(option);
	});
	$("#framework").val(data['frameworkId']);
	addRationale(data["rationaleList"]);
	$("#conclusion").val(data.conclusion);
}

$(function(){
	$(document).click((e) => {
		const targetId = e.target.id == '' ? 'noId' : e.target.id;
		const evidenceParentId = $(`#${targetId}`).data('evidenceparentid');
		const evidenceChildId = $(`#${targetId}`).data('evidencechildid');
		let evidenceId;
		switch (targetId) {
			case `check-pyramid` :
				const data = encodeURIComponent(JSON.stringify(createPyramidData(true)));
				window.open(`${urlUtil.uri}/logicalthinking/pyramidtree?data=${data}`, '_blank')
				break;
			case `addEvidence${evidenceParentId}`:
				const insertLine = $(`#evidence${evidenceParentId} textarea`).length - 1;
				evidenceId = $(`#evidence${evidenceParentId} textarea`).length;
				const new_evidence =
					'<div class="row">' +
					'<textarea id=evidence' + evidenceParentId + '_' + evidenceId + ' class="form-control" rows="3" cols="70">' +
					'</textarea>' +
					'<button type="button" id="evidenceDelete' + evidenceParentId + '_' + evidenceId + '" data-evidenceparentid="' + evidenceParentId + '" data-evidencechildid="' + evidenceId + '" class="btn btn-danger col-1">削除</button>' +
					'</div>';
				$(`#evidence${evidenceParentId}_${insertLine}`).parent().after(new_evidence);
				break;
			case `evidenceDelete${evidenceParentId}_${evidenceChildId}` :
				const evidence = $(`#evidence${evidenceParentId}_${evidenceChildId}`);
				evidence.parent().remove();
				const textareaList = $(`textarea[id*=evidence${evidenceParentId}_]`);
				const deleteButtonList = $(`button[id*=evidenceDelete${evidenceParentId}_]`);

				for (let i = 1; i < textareaList.length; i++) {
					textareaList.eq(i).attr('id', `evidence${evidenceParentId}_${i}`);
				}

				for (let j = 0; j < deleteButtonList.length; j++) {
					deleteButtonList.eq(j).attr('id', `evidenceDelete${evidenceParentId}_${j + 1}`);
					deleteButtonList.eq(j).attr('data-evidencechildid', j+1);
				}
				break;
			case 'submit' :
				const pyramidForm = createPyramidData(false);
				if(validation()){
					$(`#submit_error`).length == 0 ? $(`#submit`).parent().before($("<div id='submit_error' class='row text-danger'>エラー入力項目があります。入力欄上のエラーメッセージをご確認ください</div></br>")) : null;
					return;
				}
				$(`#submit_error`).remove();
				const param = JSON.stringify(pyramidForm);
				$.ajax({
					url: `${urlUtil.uri}/logicalthinking/pyramid/api/upsert`,
					type: 'post',
					dataType: 'json',
					data: param,
					contentType: "application/json; charset=utf-8"
				}).then(() => {
					location.href = `${urlUtil.uri}/logicalthinking/mail`;
				}).catch((...args) => {
					console.log(args);
				});
				break;
			case "add_reason":
				const fwId = `fw${$("#reasons > section").length}`;
				evidenceId = `evidence${$("#reasons > section").length}`;
				const wordId = `word${$("#reasons > section").length}`;
				const explanationId = `explanation${$("#reasons > section").length}`;
				const anotherExplanationId = `anotherExplanation${$("#reasons > section").length}`;
				let new_section = '<section class="mb-4" id="' + fwId + '">' +
					'<div class="row">' +
					`<label>根拠を挙げる要素を入力してください</label>` +
					`<input id='manualInput${$("#reasons > section").length}' data-manualinputid=${$("#reasons > section").length} class='form-control' type='text'/>` +
					`<label id="clientSecret${$("#reasons > section").length}" for="clientSecret">` +
					'に関する根拠を挙げてください' +
					'</label>' +
					`<input type="hidden" id="${wordId}"/>` +
					'</div>' +
					'<div class="row">' +
					`<textarea id="${explanationId}" class="form-control" rows="3" cols="70">` +
					'</textarea>' +
					'</div>' +
					'<div class="row">' +
					'上記の根拠を一言で言い換えると何ですか？' +
					'</div>' +
					'<div class="row">' +
					`<input type="text" id="${anotherExplanationId}" class="form-control"/>` +
					'</div>' +
					'<div class="row">' +
					'上記の根拠に対する証拠<span style="color:red">' +
					'(事実、事例、統計、「データ、官公庁発表データ、専門家や権威者のコメントなど)</span>を書いてください' +
					'</div>' +
					`<section id="${evidenceId}">` + 
					'<div class="row">' +
					`<textarea id="${evidenceId}_0" class="form-control" rows="3" cols="70">` +
					'</textarea>' +
					'</div>' +
					'<div class="row">' +
					`<button id="addEvidence${$("#reasons > section").length}" type="button" class="btn btn-primary" data-evidenceparentid="${$("#reasons > section").length}">証拠を追加する</button>` +
					'</div>' + 
					'<div class="row">' +
					`<button type="button" id="delete_reason${$("#reasons > section").length}" data-evidenceparentid="${$("#reasons > section").length}" class="btn btn-danger">根拠の削除</button>` +
					'</div>' + 
					'</section>';
				$("#add_reason").parent().before(new_section);
				break;
			case `delete_reason${e.target.dataset.evidenceparentid}`:
				const dataEvidenceParentId = Number(e.target.dataset.evidenceparentid);
				$(`#fw${dataEvidenceParentId}`).remove();
				for (var i = dataEvidenceParentId + 1; i <= $("#reasons > section").length; i++) {
					$(`#fw${i}`).attr("id", `fw${i-1}`);
					$(`#manualInput${i}`).attr("data-manualinputid", i - 1);
					$(`#manualInput${i}`).attr("id", `manualInput${i - 1}`);
					$(`#clientSecret${i}`).attr("id", `clientSecret${i - 1}`);
					$(`#word${i}`).attr("id", `word${i - 1}`);
					$(`#explanation${i}`).attr("id", `explanation${i - 1}`);
					$(`#anotherExplanation${i}`).attr("id", `anotherExplanation${i - 1}`);
					if ($(`evidence${i} > textarea`).length != 0) {
						for (var j = 0; j <= $(`evidence${i} > textarea`).length; j++) {
							$(`evidence${i}_${j}`).attr("id", `evidence${i - 1}_${j}`)
						}
					}
					$(`#evidence${i}`).attr("id", `evidence${i - 1}`);
					$(`#addEvidence${i}`).attr("data-evidenceparentid", i - 1);
					$(`#addEvidence${i}`).attr("id", `addEvidence${i - 1}`)
					$(`#delete_reason${i}`).attr("data-evidenceparentid", i - 1);
					$(`#delete_reason${i}`).attr("id", `addEvidence${i - 1}`)
				}
				break;
			default:
		}
	});

	$(document).on('change', function (e) {
		const targetId = e.target.id;
		switch (targetId) {
			case 'framework':
				// 既存のフレームワークの要素を削除
				const frameworkElement = frameworkElements[$(`#${targetId}`).val()];
				$('#add_button').remove();
				$('.reason').children().remove();
				addRationale(frameworkElement);
			break;
			case 'frameworkKind':
				const framework = frameworks[$(`#${targetId}`).val()];
				$('.reason').children().remove();
				$('#add_button').remove();
				const select = document.getElementById("framework");
				$('#framework > option').remove();
				const defaultOpt = document.createElement('option');
				defaultOpt.text = '-- 使えそうなフレームワークを１つ選択してください --'
				defaultOpt.value = '0';
				select.appendChild(defaultOpt);

				framework.forEach(function (val) {
					const option = document.createElement("option");
					option.text = val.content;
					option.value = val.id;
					select.appendChild(option);
				});
				break;
			default:
		}
	});

	$(document).keyup(function(e) {
		const targetId = e.target.id == '' ? 'undefined' : e.target.id;
		switch (targetId) {
			case `manualInput${$(`#${targetId}`)?.data("manualinputid")}` :
				$(`#clientSecret${$(`#${targetId}`).data("manualinputid")}`).text(`${e.target.value}に関する根拠を挙げてください`);
				$(`#word${$(`#${targetId}`).data("manualinputid")}`).val(e.target.value);
			break;
		}
	});
});

function validation () {
	let validatedError = false;
	if ($("#frameworkKind").value == 0 || $("#framework").value == 0){
		validatedError = true;
	}
	Object.keys(errors).forEach(key => {
		errors[key].forEach(error => {
			error.validation();
			if (error.errorElement.validatedError) {
				$(`#${error.errorElement.elementName}_error`).length == 0 ? $(`#${error.errorElement.elementName}`).before(error.errorElement.message) : null;
				validatedError = true;
			} else {
				$(`#${error.errorElement.elementName}_error`).remove();
			}
		})
		errors[key] = [];
	})
	return validatedError;
}

function createPyramidData(isCreatePyramidTree) {
	const pyramidForm = {
		frameworkKindId: $('#frameworkKind').val(),
		frameworkId: $('#framework').val(),
		task: $("#task").text(),
		conclusion: $('#conclusion').val(),
		rationaleFormList: []
	}
	if(!isCreatePyramidTree){
		errors.selectedError.push(new Utils.Error($("#frameworkKind").val(), 'frameworkKind', false, true));
		errors.selectedError.push(new Utils.Error($("#framework").val(), 'framework', false, true));
		errors.pyramidError.push(new Utils.Error($('#conclusion').val(), 'conclusion', false, false));
	}
	// 根拠リストを取得
	for (let i = 0; i < $('.reason').children('section').length; i++) {
		const rationaleForm = {
			word: $(`#word${i}`).val(),
			explanation: $(`#explanation${i}`).val(),
			anotherExplanation: $(`#anotherExplanation${i}`).val(),
			evidenceFormList: [],
			displayOrder: i + 1,
		}
		if (!isCreatePyramidTree) {
			errors.rationalError.push(new Utils.Error(rationaleForm.explanation, `explanation${i}`, true, false));
			errors.rationalError.push(new Utils.Error(rationaleForm.anotherExplanation, `anotherExplanation${i}`, false, false));
		}
		// 証拠リストを取得
		for (let j = 0; j < $(`#evidence${i}`).find('textarea').length; j++) {
			const evidenceForm = {
				explanation: $(`#evidence${i}_${j}`).val(),
				displayOrder: j + 1
			}
			if (!isCreatePyramidTree) {
				errors.evidenceError.push(new Utils.Error(evidenceForm.explanation, `evidence${i}_${j}`, true, false));
			}
			rationaleForm.evidenceFormList.push(evidenceForm);
		}
		pyramidForm.rationaleFormList.push(rationaleForm);
	}
	return pyramidForm;
}