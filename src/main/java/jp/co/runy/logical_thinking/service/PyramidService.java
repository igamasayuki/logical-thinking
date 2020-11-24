package jp.co.runy.logical_thinking.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jp.co.runy.logical_thinking.domain.FrameworkKind;
import jp.co.runy.logical_thinking.domain.LogicTree;
import jp.co.runy.logical_thinking.mapper.FrameworkKindMapper;
import jp.co.runy.logical_thinking.mapper.LogicTreeMapper;

@Service
public class PyramidService {

	@Autowired
	public FrameworkKindMapper frameworkKindMapper;
	@Autowired
	public LogicTreeMapper logicTreeMapper;
	
	/**
	 * フレームワークカインド(要検討)一覧を取得するメソッド。
	 * @return　フレームワーク一覧(要素込み)
	 */
	public List<FrameworkKind> findFrameworkKind(){
		return frameworkKindMapper.findFrameworkKind();
	}
	
	/**
	 * step1にて登録された内容を取得する
	 * @return
	 */
	public LogicTree findLogicTree(Integer id, String sessionId) {
		return logicTreeMapper.findByIdAndSessionId(id, sessionId);
	}
	
}
