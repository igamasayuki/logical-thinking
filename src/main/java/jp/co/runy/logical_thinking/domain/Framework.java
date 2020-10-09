package jp.co.runy.logical_thinking.domain;

import java.util.ArrayList;
import java.util.List;

public class Framework {
	
	private int id;
	private Integer frameworkKindId;
	private List<FrameworkElement> frameworkElementList = new ArrayList<>();
	
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
	 * @return the frameworkKindId
	 */
	public Integer getFrameworkKindId() {
		return frameworkKindId;
	}
	/**
	 * @param frameworkKindId the frameworkKindId to set
	 */
	public void setFrameworkKindId(Integer frameworkKindId) {
		this.frameworkKindId = frameworkKindId;
	}
	/**
	 * @return the frameworkElementList
	 */
	public List<FrameworkElement> getFrameworkElementList() {
		return frameworkElementList;
	}
	/**
	 * @param frameworkElementList the frameworkElementList to set
	 */
	public void setFrameworkElementList(List<FrameworkElement> frameworkElementList) {
		this.frameworkElementList = frameworkElementList;
	}
	
	

}
