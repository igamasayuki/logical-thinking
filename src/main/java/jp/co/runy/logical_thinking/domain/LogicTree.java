package jp.co.runy.logical_thinking.domain;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

/**
 * @author takahashikouhei
 * ロジックツリーの構成を表すクラス.
 */
@Data
public class LogicTree {
	
	private int id;
	/**
	 * 相手が欲しいもの
	 */
	@NotBlank
	@Size(max = 100)
	private String partnerWants;
	/**
	 * あなたの現場
	 */
	@NotBlank
	@Size(max = 100)
	private String currentState;
	/**
	 * 原因(理由)/方法
	 */
	private Integer descriptionType;
	private Integer frameworkId;
	/**
	 * 主張
	 */
	@NotBlank
	private String insistence;
	private List<FirstHierarchy> firstHierarchyList;
	private String sessionId;
	
}
