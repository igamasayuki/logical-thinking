package jp.co.runy.logical_thinking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jp.co.runy.logical_thinking.domain.Example;
import jp.co.runy.logical_thinking.domain.FirstHierarchy;
import jp.co.runy.logical_thinking.domain.LogicTree;
import jp.co.runy.logical_thinking.domain.Pyramid;
import jp.co.runy.logical_thinking.domain.Reason;
import jp.co.runy.logical_thinking.domain.SecondHierarchy;
import jp.co.runy.logical_thinking.domain.ThirdHierarchy;
import jp.co.runy.logical_thinking.mapper.ExampleMapper;
import jp.co.runy.logical_thinking.mapper.FirstHierarchyMapper;
import jp.co.runy.logical_thinking.mapper.LogicTreeMapper;
import jp.co.runy.logical_thinking.mapper.PyramidMapper;
import jp.co.runy.logical_thinking.mapper.ReasonMapper;
import jp.co.runy.logical_thinking.mapper.SecondHierarchyMapper;
import jp.co.runy.logical_thinking.mapper.ThirdHierarchyMapper;

/**
 * @author nakagawatomoya
 * 「Step3 生成されたメール文章」で使用するサービスクラス
 */

@Service
public class MailService {
	@Autowired
	private LogicTreeMapper logicTreeMapper;
	@Autowired
	private FirstHierarchyMapper firstHierarchyMapper;
	@Autowired
	private SecondHierarchyMapper secondHierarchyMapper;
	@Autowired
	private ThirdHierarchyMapper thirdHierarchyMapper;
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
	public LogicTree findLogicTree(){
		return logicTreeMapper.selectLogicTree();
	}

	/**
	 * 第一階層一覧を取得するメソッド
	 * @return 第一階層一覧
	 */
	public List<FirstHierarchy> findFirstHierarchy() {
		return firstHierarchyMapper.selectFirstHierarchy();
	}
	
	/**
	 * 第二階層一覧を取得するメソッド
	 * @return 第二階層一覧
	 */
	public List<SecondHierarchy> findSecondHierarchy() {
		return secondHierarchyMapper.selectSecondHierarchy();
	}
	
	/**
	 * 第三階層一覧を取得するメソッド
	 * @return 第三階層一覧
	 */
	public List<ThirdHierarchy> findThirdHierarchy() {
		return thirdHierarchyMapper.selectThirdHierarchy();
	}

	/**
	 * ピラミッド一覧を取得するメソッド
	 * @return ピラミッド一覧
	 */
	public List<Pyramid> findPyramid() {
		return pyramidMapper.selectPyramid();
	}

	/**
	 * 根拠一覧を取得するメソッド
	 * @return 根拠一覧
	 */
	public List<Reason> findReason() {
		return reasonMapper.selectReason();
	}

	/**
	 * 証拠一覧を取得するメソッド
	 * @return 証拠一覧
	 */
	public List<Example> findExample() {
		return exampleMapper.selectExample();
	}
}
