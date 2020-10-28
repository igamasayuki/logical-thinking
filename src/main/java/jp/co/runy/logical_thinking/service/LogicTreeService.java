package jp.co.runy.logical_thinking.service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jp.co.runy.logical_thinking.domain.FirstHierarchy;
import jp.co.runy.logical_thinking.domain.Framework;
import jp.co.runy.logical_thinking.domain.LogicTree;
import jp.co.runy.logical_thinking.domain.SecondHierarchy;
import jp.co.runy.logical_thinking.domain.ThirdHierarchy;
import jp.co.runy.logical_thinking.mapper.FirstHierarchyMapper;
import jp.co.runy.logical_thinking.mapper.FrameworkMapper;
import jp.co.runy.logical_thinking.mapper.LogicTreeMapper;
import jp.co.runy.logical_thinking.mapper.SecondHierarchyMapper;
import jp.co.runy.logical_thinking.mapper.ThirdHierarchyMapper;

/**
 * @author takahashikouhei
 * 「Step1 全体像を把握する」で使用するサービスクラス
 */
@Service
public class LogicTreeService {
	@Autowired
	private LogicTreeMapper logicTreeMapper;
	@Autowired
	private FirstHierarchyMapper firstHierarchyMapper;
	@Autowired
	private SecondHierarchyMapper secondHierarchyMapper;
	@Autowired
	private ThirdHierarchyMapper thirdHierarchyMapper;
	@Autowired
	private FrameworkMapper frameworkMapper;
	
	/**
	 * フレームワーク一覧を取得するメソッド
	 * @return フレームワーク一覧(要素込み)
	 */
	public List<Framework> findFramework(){
		return frameworkMapper.findramework();
	}
	
	/**
	 * ロジックツリーを保存するメソッド
	 * @param logicTree
	 * @param session
	 * @return ロジックツリーid
	 */
	public int upsert(LogicTree logicTree, HttpSession session) {
		// ロジックツリーを保存する
		logicTree.setSessionId(session.getId());
		logicTreeMapper.upsert(logicTree);
		// 第一階層を保存する
//		List<FirstHierarchy> FirstHierarchyList = new ArrayList<>();
		if(logicTree.getFirstHierarchyList().size() != 0) {
			System.out.println("第一階層はある");
			for (FirstHierarchy firstHierarchy : logicTree.getFirstHierarchyList()) {
				// 第一階層を保存する(登録したidを取得する)
				firstHierarchy.setLogicTreeId(logicTree.getId());
				firstHierarchyMapper.upsert(firstHierarchy);
				if(firstHierarchy.getSecondHierarchyList().size() != 0) {
					for (SecondHierarchy secondHierarchy : firstHierarchy.getSecondHierarchyList()) {
						// insertした第一階層のidを取得
						secondHierarchy.setFirstHierarchyId(firstHierarchy.getId());
						secondHierarchyMapper.upsert(secondHierarchy);
						if(secondHierarchy.getThirdHierarchyList().size() != 0) {
							for (ThirdHierarchy thirdHierarchy : secondHierarchy.getThirdHierarchyList()) {
								thirdHierarchy.setSecondHierarchyId(secondHierarchy.getId());
								thirdHierarchyMapper.upsert(thirdHierarchy);
							}
						}
					}
				}
				
			}
		}
		return logicTree.getId();
	}

}
