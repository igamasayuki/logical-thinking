package jp.co.runy.logical_thinking.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import jp.co.runy.logical_thinking.domain.LogicTree;
import jp.co.runy.logical_thinking.form.MindMapForm;

/**
 * マインドマップを表示するためのコントローラー.
 * 
 * @author nonaka
 *
 */
@Controller
public class ShowMindMapController {
	
	@ModelAttribute
	public MindMapForm getMindMapForm() {
		return new MindMapForm();
	}
	
	/**
	 * マインドマップページに遷移する.
	 * 
	 * @param form マインドマップフォーム
	 * @param model リクエストスコープ
	 * @return マインドマップページ
	 */
	@PostMapping("/logical-thinking/mindmap")
	public String showMindMap (MindMapForm form, Model model) {
		LogicTree logicTree = new LogicTree();
		BeanUtils.copyProperties(form, logicTree);
		model.addAttribute("logicTree", logicTree);
		return "logictree/mindmap";
	}
}
