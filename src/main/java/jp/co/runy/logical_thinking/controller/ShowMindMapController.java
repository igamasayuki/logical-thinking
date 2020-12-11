package jp.co.runy.logical_thinking.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jp.co.runy.logical_thinking.domain.LogicTree;
import jp.co.runy.logical_thinking.domain.PyramidTree;
import jp.co.runy.logical_thinking.form.PyramidForm;

/**
 * マインドマップを表示するためのコントローラー.
 * 
 * @author nonaka
 *
 */
@Controller
public class ShowMindMapController {
	
	/**
	 * マインドマップページに遷移する.
	 * 
	 * @param form マインドマップフォーム
	 * @param model リクエストスコープ
	 * @return マインドマップページ
	 * @throws JsonProcessingException 
	 * @throws JsonMappingException 
	 */
	@GetMapping("/logicalthinking/mindmap")
	public String showMindMap (String json, Model model) throws JsonMappingException, JsonProcessingException {
		//JacksonのObjectMapperインスタンスを作成
		ObjectMapper mapper = new ObjectMapper();
		//JSON⇒Javaオブジェクトに変換
		LogicTree logicTree = mapper.readValue(json, LogicTree.class);	
		model.addAttribute("logicTree", logicTree);
		return "logicTree/mindmap.html";
	}

	@GetMapping("/logicalthinking/pyramidtree")
	public String showPyramidTree(String data, Model model) throws JsonMappingException, JsonProcessingException {
		final ObjectMapper mapper = new ObjectMapper();
		final PyramidForm pyramidForm = mapper.readValue(data, PyramidForm.class);
		final PyramidTree pyramidTreeTask = new PyramidTree();
		pyramidTreeTask.setName("課題");
		pyramidTreeTask.setTitle(pyramidForm.getTask());
		final PyramidTree pyramidTreeConclusion = new PyramidTree();
		pyramidTreeConclusion.setName("結論");
		pyramidTreeConclusion.setTitle(pyramidForm.getConclusion());
		pyramidTreeTask.getChildren().add(pyramidTreeConclusion);
		pyramidForm.getRationaleFormList().stream()
			.map(r -> new PyramidTree(r))
			.forEach(r -> {
				pyramidTreeConclusion.getChildren().add(r);
			});
		model.addAttribute("pyramid", pyramidTreeTask);
		return "pyramid/pyramid_tree";
	}
}
