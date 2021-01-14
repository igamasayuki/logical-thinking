package jp.co.runy.logical_thinking.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Whyツリーの見本を表示させるためのコントローラー.
 * 
 * @author nonaka
 *
 */
@Controller
public class ShowWhyTreeController {
	
	/**
	 * サンプル画像を表示する.
	 * 
	 * @param model リクエストスコープ
	 * @param sampleName サンプル名
	 */
	@RequestMapping("/sample_tree")
	public String showWhyTree(Model model, String sampleName) {
		if ("whytree".equals(sampleName) || "howtree".equals(sampleName)) {
			model.addAttribute("treeName", sampleName);			
		}else {
			return "redirect:/logicalthinking/logictree";
		}
		return "/samples/sample-image";
	}
}
