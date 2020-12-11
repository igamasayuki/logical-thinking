package jp.co.runy.logical_thinking.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jp.co.runy.logical_thinking.domain.LogicTree;

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
	@GetMapping("/logicalthinking/logictree-map")
	public String showMindMap (String json, Model model) throws JsonMappingException, JsonProcessingException {
		//JacksonのObjectMapperインスタンスを作成
		ObjectMapper mapper = new ObjectMapper();
		//JSON⇒Javaオブジェクトに変換
		LogicTree logicTree = mapper.readValue(json, LogicTree.class);	
		System.out.println(logicTree);
		model.addAttribute("logicTree", logicTree);
		return "logicTree/logictree-map.html";
	}
}
