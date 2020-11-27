package jp.co.runy.logical_thinking.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jp.co.runy.logical_thinking.domain.Framework;
import jp.co.runy.logical_thinking.domain.FrameworkElement;
import jp.co.runy.logical_thinking.service.FrameworkKindService;
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

	@Autowired
	private FrameworkKindService frameworkKindService;

	@GetMapping("/get")
	@ResponseStatus(HttpStatus.OK)
	public Map<String, Map<Integer, List<?>>> get() {
		final Map<Integer, List<Framework>> frameworkMap = frameworkKindService.findAll();
		final Map<Integer, List<FrameworkElement>> frameworkElementMap = frameworkService.findAll();
		final Map<String, Map<Integer, List<?>>> map = new HashMap() {
			/**
			 * シリアルバージョンUID.
			 */
			private static final long serialVersionUID = 1L;

			{
				put("Framework",frameworkMap);
				put("FrameworkElement",frameworkElementMap);
			}
		};
		return map;
	}

}
