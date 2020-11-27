package jp.co.runy.logical_thinking.form;

import java.util.List;

import jp.co.runy.logical_thinking.domain.FirstHierarchy;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MindMapForm {
	/** 相手が欲しいもの */
	private String partnerWants;
	/** あなたの現場 */
	private String currentState;
	/** 原因(理由)/方法 */
	private Integer descriptionType;
	/** フレームワークの種類 */
	private Integer frameworkId;
	/** 主張*/
	private String insistence;
	/** 第一階層リスト */
	private List<FirstHierarchy> firstHierarchyList;
}
