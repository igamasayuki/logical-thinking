package jp.co.runy.logical_thinking.controller;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import jp.co.runy.logical_thinking.domain.LogicTree;
import jp.co.runy.logical_thinking.form.MindMapForm;
import jp.co.runy.logical_thinking.service.FrameworkService;

/**
 * マインドマップを表示するためのコントローラー.
 * 
 * @author nonaka
 *
 */
@Controller
public class ShowMindMapController {
	
	@Autowired
	private FrameworkService frameworkService;
	
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
		logicTree.setFrameworkId(form.getFw());
		
		final List<String> elementList = frameworkService.getElementList(logicTree.getFrameworkId());
		
		if(!CollectionUtils.isEmpty(form.getAdditionalWord())) {
			form.getAdditionalWord().forEach(additionalWord -> {
				elementList.add(additionalWord);
			});
		}
		System.out.println(elementList);
		model.addAttribute("logicTree", form);
		model.addAttribute("elementList", elementList);
		
		return "logictree/mindmap";
	}
}
