package jp.co.runy.logical_thinking.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jp.co.runy.logical_thinking.domain.Framework;
import jp.co.runy.logical_thinking.domain.FrameworkElement;
import jp.co.runy.logical_thinking.mapper.FrameworkMapper;

@Service
public class FrameworkService {

	@Autowired
	private FrameworkMapper frameworkMapper;
	
	/**
	 * フレームワークの各要素をフレームワーク一覧から取得するメソッド
	 * 
	 * @return Map<Integer, List<FrameworkElement>> フレームワーク要素のマップオブジェクト
	 */
	public Map<Integer, List<FrameworkElement>> findAll() {
		final List<Framework> frameworkList = frameworkMapper.findAll();
		final Map<Integer, List<FrameworkElement>> frameworkElementMap = frameworkList.stream()
		.collect(Collectors.toMap(
				f -> f.getId(), f -> f.getFrameworkElementList()));
		return frameworkElementMap;
	}
	
	/**
	 * フレームワークの要素名リストを取得する.
	 * 
	 * @author nonaka
	 * 
	 * @param frameworkId フレームワークID
	 * @return フレームワーク要素名リスト
	 */
	public List<String> getElementList (Integer frameworkId) {
		final Framework framework = frameworkMapper.findById(frameworkId);
		final List<String> elementList = new ArrayList<>();
		framework.getFrameworkElementList()
				.stream()
				.forEach(frameworkElement -> {
					elementList.add(frameworkElement.getElement());
				});
		return elementList;
	}
}
