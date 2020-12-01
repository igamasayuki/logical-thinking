package jp.co.runy.logical_thinking.form;

import java.util.List;

import jp.co.runy.logical_thinking.domain.FirstHierarchy;

/**
 * マインドマップ用フォーム.
 * 
 * @author nonaka
 *
 */
public class MindMapForm {
	/** 相手が欲しいもの */
	private String partnerWants;
	/** あなたの現場 */
	private String currentState;
	/** 原因(理由)/方法 */
	private Integer descriptionType;
	/** フレームワークの種類 */
	private Integer fw;
	/** 別名 */
	private List<String> anotherWord;
	/** 追加要素 */
	private List<String> additionalWord;
	/** 第二階層説明文 */
	private List<String> secondHierarchyTextList;
	/** 主張*/
	private String insistence;
	/** 第一階層リスト */
	private List<FirstHierarchy> firstHierarchyList;
	public String getPartnerWants() {
		return partnerWants;
	}
	public void setPartnerWants(String partnerWants) {
		this.partnerWants = partnerWants;
	}
	public String getCurrentState() {
		return currentState;
	}
	public void setCurrentState(String currentState) {
		this.currentState = currentState;
	}
	public Integer getDescriptionType() {
		return descriptionType;
	}
	public void setDescriptionType(Integer descriptionType) {
		this.descriptionType = descriptionType;
	}
	public Integer getFw() {
		return fw;
	}
	public void setFw(Integer fw) {
		this.fw = fw;
	}
	public List<String> getAnotherWord() {
		return anotherWord;
	}
	public void setAnotherWord(List<String> anotherWord) {
		this.anotherWord = anotherWord;
	}
	public List<String> getAdditionalWord() {
		return additionalWord;
	}
	public void setAdditionalWord(List<String> additionalWord) {
		this.additionalWord = additionalWord;
	}
	public List<String> getSecondHierarchyTextList() {
		return secondHierarchyTextList;
	}
	public void setSecondHierarchyTextList(List<String> secondHierarchyTextList) {
		this.secondHierarchyTextList = secondHierarchyTextList;
	}
	public String getInsistence() {
		return insistence;
	}
	public void setInsistence(String insistence) {
		this.insistence = insistence;
	}
	public List<FirstHierarchy> getFirstHierarchyList() {
		return firstHierarchyList;
	}
	public void setFirstHierarchyList(List<FirstHierarchy> firstHierarchyList) {
		this.firstHierarchyList = firstHierarchyList;
	}
	@Override
	public String toString() {
		return "MindMapForm [partnerWants=" + partnerWants + ", currentState=" + currentState + ", descriptionType="
				+ descriptionType + ", fw=" + fw + ", anotherWord=" + anotherWord + ", additionalWord=" + additionalWord
				+ ", secondHierarchyTextList=" + secondHierarchyTextList + ", insistence=" + insistence
				+ ", firstHierarchyList=" + firstHierarchyList + "]";
	}
}
