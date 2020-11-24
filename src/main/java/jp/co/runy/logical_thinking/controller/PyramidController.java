package jp.co.runy.logical_thinking.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import jp.co.runy.logical_thinking.domain.Framework;
import jp.co.runy.logical_thinking.domain.FrameworkKind;
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
public class PyramidController {
	
	@Autowired
	PyramidService pyramidService;
	
	final SessionTypeConversion sessionTypeConversion = new SessionTypeConversion();

	/** 
	 * @return PyramidForm
	 */
	@ModelAttribute
	public PyramidForm getPyramidForm() {
		return new PyramidForm();
	}
	
	/**
	 * @param model
	 * @return 「Step2 ピラミッド構造=PREPを作成する」ページ
	 * @throws SessionTypeConversionExeption
	 */
	@RequestMapping(value = "/logicalthinking/pyramid")
	public String readPyramid(Model model, HttpSession session) throws SessionTypeConversionExeption {
		List<FrameworkKind> kindList = pyramidService.findFrameworkKind();
		final Integer id = sessionTypeConversion.typeConversionStringToInteger(session.getAttribute(SESSION_LOGICTREE_ID_KEY));

		model.addAttribute("frameworkList", getFrameworkList(kindList));
		model.addAttribute("logicTree", pyramidService.findLogicTree(id ,session.getId()));
		model.addAttribute("frameworkKindList", kindList);
		
		System.out.println(pyramidService.findLogicTree(id, session.getId()));

		return "/pyramid/main";
	}
	
	/**
	 * 取得したフレームワークの分類リストからフレームワークのリストを返すメソッド
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
	 * @param form
	 * @param model
	 * @return String
	 */
	@RequestMapping(value = "/logicalthinking/pyramid/test", method = RequestMethod.POST)
	public String test(@ModelAttribute("pyramidForm") PyramidForm form , Model model) {
		System.out.println("-----------------");
		//System.out.println(form.getRationaleList().get(0).getId());
		return "pyramid/test";
	}
}