package jp.co.runy.logical_thinking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jp.co.runy.logical_thinking.domain.FrameworkElement;
import jp.co.runy.logical_thinking.service.FrameworkElementService;

/**
 * @author takahashikouhei
 * ajaxでフレームワークの情報を取得するためのコントローラ
 */
@RestController
@RequestMapping("/api/frameworkelement")
public class FrameworkElementController {

	@Autowired
	private FrameworkElementService frameworkElementService;

	/**
	 * フレームワークの要素を取得するメソッド.
	 * 
	 * @param id 選択したframeworkのid
	 * @return フレームワークの要素一覧
	 */
	@GetMapping("/get/{id}")
	@ResponseStatus(HttpStatus.OK)
	public List<FrameworkElement> getFramewaorkElements(@PathVariable("id") int id) {
		return frameworkElementService.findFrameworkElementById(id);
	}
}
