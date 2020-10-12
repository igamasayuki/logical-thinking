package jp.co.runy.logical_thinking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jp.co.runy.logical_thinking.domain.Framework;
import jp.co.runy.logical_thinking.mapper.FrameworkMapper;

/**
 * @author takahashikouhei
 * 「Step1 全体像を把握する」で使用するサービスクラス
 */
@Service
public class LogicTreeService {
	@Autowired
	private FrameworkMapper frameworkMapper;
	
	/**
	 * フレームワーク一覧を取得するメソッド
	 * @return フレームワーク一覧(要素込み)
	 */
	public List<Framework> findFramework(){
		return frameworkMapper.findramework();
	}

}
