package jp.co.runy.logical_thinking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import jp.co.runy.logical_thinking.domain.Framework;
import jp.co.runy.logical_thinking.form.LogicTreeForm;
import jp.co.runy.logical_thinking.service.LogicTreeService;

/**
 * @author takahashikouhei
 *「Step1 全体像を把握する」で使用するコントローラクラス
 */
@Controller
public class LogicTreeController {
	@Autowired
	private LogicTreeService logicTreeService;
	
	@ModelAttribute
	public LogicTreeForm getLogicTreeForm() {
		return new LogicTreeForm();
	}
	/**
	 * @param model
	 * @return 「Step1 全体像を把握する」ページ
	 */
	@RequestMapping(value = "/logicalthinking/logictree")
	public String readLogicTree(Model model) {
		
		model.addAttribute("frameworkList",logicTreeService.findFramework());
		return "/logicTree/main";
	}
	
	@RequestMapping(value = "/test", method = RequestMethod.POST)
	public String test(@ModelAttribute("logicTreeForm") LogicTreeForm form, Model model) {
		System.out.println("-------------------------");
		System.out.println(form);
		return "/logicTree/test";
	}
	
}
