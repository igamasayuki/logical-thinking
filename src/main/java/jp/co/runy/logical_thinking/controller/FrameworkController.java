package jp.co.runy.logical_thinking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jp.co.runy.logical_thinking.domain.Framework;
import jp.co.runy.logical_thinking.service.FrameworkService;

/**
 * @author takahashikouhei
 * ajaxでフレームワークの情報を取得するためのコントローラ
 */
@RestController
@RequestMapping("/api/framework")
public class FrameworkController {
	
	@Autowired
	private FrameworkService frameworkService;
	
	
	/** 
	 * フレームワークを取得するメソッド.
	 * 
	 * @param id フレームワークのID
	 * @return List<Framework> フレームワーク一覧
	 */
	@GetMapping("/get/{id}")
	@ResponseStatus(HttpStatus.OK)
	public List<Framework> getFramewaorks(@PathVariable("id") int id) {
		return frameworkService.findFramework(id);
	}
}
