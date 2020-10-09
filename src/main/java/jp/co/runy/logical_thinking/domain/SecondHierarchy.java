package jp.co.runy.logical_thinking.domain;

import java.util.ArrayList;
import java.util.List;

public class SecondHierarchy {
	
	private int id;
	private String explanation;
	private Integer firstHierarchyId;
	private List<ThirdHierarchy> thirdHierarchyList = new ArrayList<>();
	
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
	 * @return the explanation
	 */
	public String getExplanation() {
		return explanation;
	}
	/**
	 * @param explanation the explanation to set
	 */
	public void setExplanation(String explanation) {
		this.explanation = explanation;
	}
	/**
	 * @return the firstHierarchyId
	 */
	public Integer getFirstHierarchyId() {
		return firstHierarchyId;
	}
	/**
	 * @param firstHierarchyId the firstHierarchyId to set
	 */
	public void setFirstHierarchyId(Integer firstHierarchyId) {
		this.firstHierarchyId = firstHierarchyId;
	}
	/**
	 * @return the thirdHierarchyList
	 */
	public List<ThirdHierarchy> getThirdHierarchyList() {
		return thirdHierarchyList;
	}
	/**
	 * @param thirdHierarchyList the thirdHierarchyList to set
	 */
	public void setThirdHierarchyList(List<ThirdHierarchy> thirdHierarchyList) {
		this.thirdHierarchyList = thirdHierarchyList;
	}
	
	

}
