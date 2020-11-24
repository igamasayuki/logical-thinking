package jp.co.runy.logical_thinking.domain;

import java.util.List;

/**
 * @author takahashikouhei
 * ロジックツリーの第一階層のクラス
 */
public class FirstHierarchy {
	
	private int id;
	private String word;
	private String anotherWord;
	private int logicTreeId;
	private List<SecondHierarchy> secondHierarchyList;
	
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
	public int getLogicTreeId() {
		return logicTreeId;
	}
	/**
	 * @param logicTreeId the logicTreeId to set
	 */
	public void setLogicTreeId(int logicTreeId) {
		this.logicTreeId = logicTreeId;
	}
	/**
	 * @return the scondHierarchyList
	 */
	public List<SecondHierarchy> getSecondHierarchyList() {
		return secondHierarchyList;
	}
	/**
	 * @param scondHierarchyList the scondHierarchyList to set
	 */
	public void setScondHierarchyList(List<SecondHierarchy> secondHierarchyList) {
		this.secondHierarchyList = secondHierarchyList;
	}
	
	

}
