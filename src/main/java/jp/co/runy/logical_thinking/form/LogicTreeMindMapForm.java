package jp.co.runy.logical_thinking.form;

import java.util.List;

/**
 * マインドマップ用フォーム.
 * 
 * @author nonaka
 *
 */
public class LogicTreeMindMapForm {
	/** 相手が欲しいもの */
	private String partnerWants;
	/** あなたの現場 */
	private String currentState;
	/** 原因(理由)/方法 */
	private Integer descriptionType;
	/** フレームワークの種類 */
	private Integer fw;
	/** 要素リスト */
	private List<String> elementList;
	/** 追加要素 */
	private List<String> additionalWord;
	/** 主張 */
	private String insistence;
	/** 第一階層リスト */
	private List<FirstHierarchyForm> firstHierarchyList;
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
	public List<String> getElementList() {
		return elementList;
	}
	public void setElementList(List<String> elementList) {
		this.elementList = elementList;
	}
	public List<String> getAdditionalWord() {
		return additionalWord;
	}
	public void setAdditionalWord(List<String> additionalWord) {
		this.additionalWord = additionalWord;
	}
	public String getInsistence() {
		return insistence;
	}
	public void setInsistence(String insistence) {
		this.insistence = insistence;
	}
	public List<FirstHierarchyForm> getFirstHierarchyList() {
		return firstHierarchyList;
	}
	public void setFirstHierarchyList(List<FirstHierarchyForm> firstHierarchyList) {
		this.firstHierarchyList = firstHierarchyList;
	}
	@Override
	public String toString() {
		return "LogicTreeMindMapForm [partnerWants=" + partnerWants + ", currentState=" + currentState
				+ ", descriptionType=" + descriptionType + ", fw=" + fw + ", elementList=" + elementList
				+ ", additionalWord=" + additionalWord + ", insistence=" + insistence + ", firstHierarchyList="
				+ firstHierarchyList + "]";
	}
}
