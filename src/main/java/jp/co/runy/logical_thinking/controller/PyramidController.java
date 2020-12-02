package jp.co.runy.logical_thinking.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import jp.co.runy.logical_thinking.domain.Example;
import jp.co.runy.logical_thinking.domain.Framework;
import jp.co.runy.logical_thinking.domain.FrameworkKind;
import jp.co.runy.logical_thinking.domain.Pyramid;
import jp.co.runy.logical_thinking.domain.Reason;
import jp.co.runy.logical_thinking.exception.SessionTypeConversionExeption;
import jp.co.runy.logical_thinking.form.PyramidForm;
import jp.co.runy.logical_thinking.form.ReasonForm;
import jp.co.runy.logical_thinking.service.PyramidService;
import jp.co.runy.logical_thinking.util.SessionTypeConversion;

import static jp.co.runy.logical_thinking.util.SessionKeyUtil.*;

/**
 * @author okazakitatsuro
 * 「Step2 ピラミッド構造=PREPを作成する」で使用するコントローラクラス
 */
@Controller
@RequestMapping("/logicalthinking/pyramid")
public class PyramidController {
	
	@Autowired
	PyramidService pyramidService;
	
	ObjectMapper mapper = new ObjectMapper();
	
	/**
	 * セッション取得時の型を変更するクラスオブジェクト.
	 */
	final SessionTypeConversion sessionTypeConversion = new SessionTypeConversion();

	/**
	 * ピラミッド作成時に使用するフォーム.
	 * 
	 * @return PyramidForm フォームクラス
	 */
	@ModelAttribute
	public PyramidForm getPyramidForm() {
		return new PyramidForm();
	}
	
	/**
	 * 「Step2 ピラミッド構造=PREPを作成する」ページを表示するメソッド.
	 * 
	 * @param model モデル
	 * @return 「Step2 ピラミッド構造=PREPを作成する」ページ
	 * @throws SessionTypeConversionExeption
	 */
	@RequestMapping(value = "")
	public String readPyramid(Model model, HttpSession session) throws SessionTypeConversionExeption {
		List<FrameworkKind> kindList = pyramidService.findFrameworkKind();
		final Integer id = sessionTypeConversion.typeConversionStringToInteger(session.getAttribute(SESSION_LOGICTREE_ID_KEY));

		model.addAttribute("frameworkList", getFrameworkList(kindList));
		model.addAttribute("logicTree", pyramidService.findLogicTree(id ,session.getId()));
		model.addAttribute("frameworkKindList", kindList);

		return "/pyramid/main";
	}
	
	/**
	 * 取得したフレームワークの分類リストからフレームワークのリストを返すメソッド.
	 * 
	 * @param frameworkKindList
	 * @return frameworkList
	 */
	public List<Framework> getFrameworkList(List<FrameworkKind> frameworkKindList){
		List<Framework> frameworkList = new ArrayList<>();
		
		// 取得したフレームワーク分類リストの各要素のフレームワークをすべてリストに追加していく
		for(FrameworkKind frameworkKind : frameworkKindList) {
			frameworkList.addAll(frameworkKind.getFrameworkList());
		}
		return frameworkList;
	}

	
	/** 
	 * @param upsert(
	 * @return String
	 * @throws JsonMappingException
	 * @throws JsonProcessingException
	 * @throws SessionTypeConversionExeption
	 */
	@ResponseBody
	@RequestMapping(value ="/api/upsert", method = RequestMethod.POST, produces = "text/plain;charset=UTF-8")
	public String upsert(
			@Validated @RequestBody PyramidForm pyramidForm, HttpSession session)
			throws JsonMappingException, JsonProcessingException, SessionTypeConversionExeption {
		final Pyramid pyramid = new Pyramid();
		BeanUtils.copyProperties(pyramidForm, pyramid);
		if(session.getAttribute(SESSION_PYRAMID_ID_KEY) != null) {
			pyramid.setId(new SessionTypeConversion().typeConversionStringToInteger(
					session.getAttribute(SESSION_PYRAMID_ID_KEY)));
		};
		final List<Reason> reasonList = pyramidForm.getRationaleFormList().stream()
				.map(reasonForm -> convertReason(reasonForm))
				.collect(Collectors.toList());
		pyramid.setRationaleList(reasonList);
		final int id = pyramidService.insert(pyramid, session.getId());
		pyramid.setId(id);
		session.setAttribute(SESSION_PYRAMID_ID_KEY, id);
		return Integer.toString(pyramid.getId());
	}

	
	/** 
	 * Jsonで変換する根拠一覧をマッピングするメソッド.
	 * 
	 * @param form 根拠
	 * @return Reason 根拠
	 */
	private Reason convertReason(ReasonForm form) {
		Reason reason = new Reason();
		BeanUtils.copyProperties(form, reason);
		final List<Example> exampleList = form.getEvidenceFormList().stream()
			.map(exampleForm -> {
				final Example example = new Example();
				BeanUtils.copyProperties(exampleForm, example);
				return example;
			})
			.collect(Collectors.toList());
		reason.setEvidenceList(exampleList);
		return reason;
	}
}