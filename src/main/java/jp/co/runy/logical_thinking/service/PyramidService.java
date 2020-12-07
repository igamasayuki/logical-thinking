package jp.co.runy.logical_thinking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jp.co.runy.logical_thinking.domain.FrameworkKind;
import jp.co.runy.logical_thinking.domain.LogicTree;
import jp.co.runy.logical_thinking.domain.Pyramid;
import jp.co.runy.logical_thinking.mapper.FrameworkKindMapper;
import jp.co.runy.logical_thinking.mapper.LogicTreeMapper;
import jp.co.runy.logical_thinking.mapper.PyramidMapper;

/**
 * @author yokogawayukihiro
 * 「Step2 ピラミッド構造=PREPを作成する」で使用するサービスクラス.
 */
@Service
public class PyramidService {

	@Autowired
	private FrameworkKindMapper frameworkKindMapper;
	
	@Autowired
	private LogicTreeMapper logicTreeMapper;
	
	@Autowired
	private PyramidMapper pyramidMapper;

	/**
	 * フレームワークカインド(要検討)一覧を取得するメソッド。
	 * @return　フレームワーク一覧(要素込み)
	 */
	public List<FrameworkKind> findFrameworkKind(){
		return frameworkKindMapper.findFrameworkKind();
	}
	
	/**
	 * step1に登録された内容を取得するメソッド.
	 * @return ロジックツリー
	 */
	public LogicTree findLogicTree(Integer id, String sessionId) {
		return logicTreeMapper.findByIdAndSessionId(id, sessionId);
	}

	
	/** 
	 * ピラミッドを登録するメソッド.
	 * 
	 * @param bean ピラミッドの登録内容
	 * @param sessionId セッションID
	 * @return Integer ピラミッドID
	 */
	public Integer insert(Pyramid bean, String sessionId) {
		return pyramidMapper.insert(bean, sessionId);
	}

	
	/** 
	 * ピラミッドを取得するメソッド.
	 * 
	 * @param id ピラミッドID
	 * @param sessionId セッションID
	 * @return Pyramid ピラミッド
	 */
	public Pyramid findPyramid(Integer id, String sessionId) {
		return pyramidMapper.findPyramid(id, sessionId);
	}
	
}
