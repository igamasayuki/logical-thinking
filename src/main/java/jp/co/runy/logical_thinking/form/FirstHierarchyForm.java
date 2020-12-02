package jp.co.runy.logical_thinking.form;

import java.util.List;

import jp.co.runy.logical_thinking.domain.SecondHierarchy;

public class FirstHierarchyForm {
	private int id;
	private String word;
	private String anotherWord;
	private int logicTreeId;
	private Integer displayOrder;
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
