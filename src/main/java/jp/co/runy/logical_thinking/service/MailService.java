package jp.co.runy.logical_thinking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jp.co.runy.logical_thinking.domain.Example;
import jp.co.runy.logical_thinking.domain.LogicTree;
import jp.co.runy.logical_thinking.domain.Pyramid;
import jp.co.runy.logical_thinking.domain.Reason;
import jp.co.runy.logical_thinking.mapper.ExampleMapper;
import jp.co.runy.logical_thinking.mapper.LogicTreeMapper;
import jp.co.runy.logical_thinking.mapper.PyramidMapper;
import jp.co.runy.logical_thinking.mapper.ReasonMapper;

/**
 * @author nakagawatomoya
 * 「Step3 生成されたメール文章」で使用するサービスクラス
 */

@Service
public class MailService {
	@Autowired
	private LogicTreeMapper logicTreeMapper;
	@Autowired
	private PyramidMapper pyramidMapper;
	@Autowired
	private ReasonMapper reasonMapper;
	@Autowired
	private ExampleMapper exampleMapper;
	
	/**
	 * ロジックツリー一覧を取得するメソッド
	 * @return ロジックツリー一覧
	 */
	public LogicTree findLogicTree(Integer id, String sessionId){
		return logicTreeMapper.findByIdAndSessionId(id, sessionId);
	}

	/**
	 * ピラミッド一覧を取得するメソッド
	 * @return ピラミッド一覧
	 */
	public List<Pyramid> findPyramid(String sessionId) {
		return pyramidMapper.selectPyramid(sessionId);
	}

	/**
	 * 根拠一覧を取得するメソッド
	 * @return 根拠一覧
	 */
	public List<Reason> findReason(String sessionId) {
		return reasonMapper.selectReason(sessionId);
	}

	/**
	 * 証拠一覧を取得するメソッド
	 * @return 証拠一覧
	 */
	public List<Example> findExample(String sessionId) {
		return exampleMapper.selectExample(sessionId);
	}
}
