package jp.co.runy.logical_thinking.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import jp.co.runy.logical_thinking.domain.Framework;
import jp.co.runy.logical_thinking.domain.FrameworkKind;
import jp.co.runy.logical_thinking.domain.Pyramid;
import jp.co.runy.logical_thinking.exception.SessionTypeConversionExeption;
import jp.co.runy.logical_thinking.form.PyramidForm;
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

	@ResponseBody
	@RequestMapping(value ="/api/upsert", method = RequestMethod.POST, produces = "text/plain;charset=UTF-8")
	public String upsert(@RequestBody String json, HttpSession session)
			throws JsonMappingException, JsonProcessingException {
		final Pyramid bean = mapper.readValue(json, Pyramid.class);
		bean.setSessionId(session.getId());
		final int id = pyramidService.insert(bean);
		bean.setId(id);
		session.setAttribute(SESSION_LOGICTREE_ID_KEY, id);
		return Integer.toString(bean.getId());
	}
}