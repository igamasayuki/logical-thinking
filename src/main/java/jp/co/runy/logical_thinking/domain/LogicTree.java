package jp.co.runy.logical_thinking.domain;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * @author takahashikouhei
 * ロジックツリーの構成を表すクラス.
 */
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
	public String getInsistence() {
		return insistence;
	}

	/**
	 * @param insistance the insistance to set
	 */
	public void setInsistance(String insistence) {
		this.insistence = insistence;
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

	/**
	 * @return
	 */
	public String getSessionId() {
		return sessionId;
	}

	/**
	 * @param sessionId
	 */
	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	@Override
	public String toString() {
		return "LogicTree [id=" + id + ", partnerWants=" + partnerWants + ", currentState=" + currentState
				+ ", descriptionType=" + descriptionType + ", frameworkId=" + frameworkId + ", insistence=" + insistence
				+ ", firstHierarchyList=" + firstHierarchyList + ", sessionId=" + sessionId + "]";
	}
	
}
