package jp.co.runy.logical_thinking.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import jp.co.runy.logical_thinking.form.LogicTreeMindMapForm;

/**
 * マインドマップを表示するためのコントローラー.
 * 
 * @author nonaka
 *
 */
@Controller
public class ShowMindMapController {
	
	@ModelAttribute
	public LogicTreeMindMapForm getMindMapForm() {
		return new LogicTreeMindMapForm();
	}
	
	/**
	 * マインドマップページに遷移する.
	 * 
	 * @param form マインドマップフォーム
	 * @param model リクエストスコープ
	 * @return マインドマップページ
	 */
	@PostMapping("/logical-thinking/mindmap")
	public String showMindMap (LogicTreeMindMapForm form, Model model) {
		if(!CollectionUtils.isEmpty(form.getAdditionalWord())) {
			form.getAdditionalWord().stream().forEach(additionalWord -> {
				form.getElementList().add(additionalWord);
			});
		}
		System.out.println(form);
		model.addAttribute("logicTree", form);		
		return "logictree/mindmap";
	}
}
