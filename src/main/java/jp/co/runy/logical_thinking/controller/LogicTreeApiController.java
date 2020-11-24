package jp.co.runy.logical_thinking.controller;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jp.co.runy.logical_thinking.domain.LogicTree;

@RestController
@RequestMapping(value = "/api/logictree")
public class LogicTreeApiController {
	
	ObjectMapper mapper = new ObjectMapper();
	
	/** 
	 * ロジックツリーを取得するメソッド.
	 * 
	 * @param json jspmデータ
	 * @param session セッションオブジェクト
	 * @throws JsonMappingException
	 * @throws JsonProcessingException
	 */
	@PostMapping
	@RequestMapping(method = RequestMethod.POST,produces="text/plain;charset=UTF-8")
	public void upsert(@RequestBody String json, HttpSession session) throws JsonMappingException, JsonProcessingException {
		System.out.println(json);
		System.out.println(session.getId());
		LogicTree bean = mapper.readValue(json, LogicTree.class);
		System.out.println(bean);
	}
}
