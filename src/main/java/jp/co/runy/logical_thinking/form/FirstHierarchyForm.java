package jp.co.runy.logical_thinking.form;

import java.util.List;

/**
 * 第一階層フォーム.
 * 
 * @author nonaka
 *
 */
public class FirstHierarchyForm {
	/** ID */
	private int id;
	/** 単語 */
	private String word;
	/** 言い換え */
	private String anotherWord;
	/** ロジックツリーID */
	private int logicTreeId;
	/** 表示 */
	private Integer displayOrder;
	/** 第二階層リスト */
	private List<SecondHierarchyForm> secondHierarchyList;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getWord() {
		return word;
	}
	public void setWord(String word) {
		this.word = word;
	}
	public String getAnotherWord() {
		return anotherWord;
	}
	public void setAnotherWord(String anotherWord) {
		this.anotherWord = anotherWord;
	}
	public int getLogicTreeId() {
		return logicTreeId;
	}
	public void setLogicTreeId(int logicTreeId) {
		this.logicTreeId = logicTreeId;
	}
	public Integer getDisplayOrder() {
		return displayOrder;
	}
	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
	}
	public List<SecondHierarchyForm> getSecondHierarchyList() {
		return secondHierarchyList;
	}
	public void setSecondHierarchyList(List<SecondHierarchyForm> secondHierarchyList) {
		this.secondHierarchyList = secondHierarchyList;
	}
	@Override
	public String toString() {
		return "FirstHierarchyForm [id=" + id + ", word=" + word + ", anotherWord=" + anotherWord + ", logicTreeId="
				+ logicTreeId + ", displayOrder=" + displayOrder + ", secondHierarchyList=" + secondHierarchyList + "]";
	}
}
