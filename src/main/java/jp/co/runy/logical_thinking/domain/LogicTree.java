package jp.co.runy.logical_thinking.domain;

import java.util.ArrayList;
import java.util.List;

public class LogicTree {
	
	private int id;
	private String partnerWants;
	private String currentState;
	private Integer descriptionType;
	private Integer frameworkId;
	private String insistance;
	private List<FirstHierarchy> firstHierarchyList = new ArrayList<>();

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
	 * @return the partnerWants
	 */
	public String getPartnerWants() {
		return partnerWants;
	}

	/**
	 * @param partnerWants the partnerWants to set
	 */
	public void setPartnerWants(String partnerWants) {
		this.partnerWants = partnerWants;
	}

	/**
	 * @return the currentState
	 */
	public String getCurrentState() {
		return currentState;
	}

	/**
	 * @param currentState the currentState to set
	 */
	public void setCurrentState(String currentState) {
		this.currentState = currentState;
	}

	/**
	 * @return the descriptionType
	 */
	public Integer getDescriptionType() {
		return descriptionType;
	}

	/**
	 * @param descriptionType the descriptionType to set
	 */
	public void setDescriptionType(Integer descriptionType) {
		this.descriptionType = descriptionType;
	}

	/**
	 * @return the frameworkId
	 */
	public Integer getFrameworkId() {
		return frameworkId;
	}

	/**
	 * @param frameworkId the frameworkId to set
	 */
	public void setFrameworkId(Integer frameworkId) {
		this.frameworkId = frameworkId;
	}

	/**
	 * @return the insistance
	 */
	public String getInsistance() {
		return insistance;
	}

	/**
	 * @param insistance the insistance to set
	 */
	public void setInsistance(String insistance) {
		this.insistance = insistance;
	}

	/**
	 * @return the firstHierarchyList
	 */
	public List<FirstHierarchy> getFirstHierarchyList() {
		return firstHierarchyList;
	}

	/**
	 * @param firstHierarchyList the firstHierarchyList to set
	 */
	public void setFirstHierarchyList(List<FirstHierarchy> firstHierarchyList) {
		this.firstHierarchyList = firstHierarchyList;
	}
	
	
	
}
