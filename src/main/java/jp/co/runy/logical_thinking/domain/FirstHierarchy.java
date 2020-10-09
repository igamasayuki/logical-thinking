package jp.co.runy.logical_thinking.domain;

import java.util.ArrayList;
import java.util.List;

public class FirstHierarchy {
	
	private int id;
	private String word;
	private String anotherWord;
	private Integer logicTreeId;
	private List<SecondHierarchy> scondHierarchyList = new ArrayList<>();
	
	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}
	/**
	 * @return the word
	 */
	public String getWord() {
		return word;
	}
	/**
	 * @param word the word to set
	 */
	public void setWord(String word) {
		this.word = word;
	}
	/**
	 * @return the anotherWord
	 */
	public String getAnotherWord() {
		return anotherWord;
	}
	/**
	 * @param anotherWord the anotherWord to set
	 */
	public void setAnotherWord(String anotherWord) {
		this.anotherWord = anotherWord;
	}
	/**
	 * @return the logicTreeId
	 */
	public Integer getLogicTreeId() {
		return logicTreeId;
	}
	/**
	 * @param logicTreeId the logicTreeId to set
	 */
	public void setLogicTreeId(Integer logicTreeId) {
		this.logicTreeId = logicTreeId;
	}
	/**
	 * @return the scondHierarchyList
	 */
	public List<SecondHierarchy> getScondHierarchyList() {
		return scondHierarchyList;
	}
	/**
	 * @param scondHierarchyList the scondHierarchyList to set
	 */
	public void setScondHierarchyList(List<SecondHierarchy> scondHierarchyList) {
		this.scondHierarchyList = scondHierarchyList;
	}
	
	

}
