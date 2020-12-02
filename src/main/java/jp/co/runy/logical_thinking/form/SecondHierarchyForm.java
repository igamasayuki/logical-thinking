package jp.co.runy.logical_thinking.form;

import java.util.ArrayList;
import java.util.List;

import jp.co.runy.logical_thinking.domain.ThirdHierarchy;

public class SecondHierarchyForm {
	private int id;
	private String explanation;
	private Integer firstHierarchyId;
	private Integer displayOrder;
	private List<ThirdHierarchy> thirdHierarchyList;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getExplanation() {
		return explanation;
	}
	public void setExplanation(String explanation) {
		this.explanation = explanation;
	}
	public Integer getFirstHierarchyId() {
		return firstHierarchyId;
	}
	public void setFirstHierarchyId(Integer firstHierarchyId) {
		this.firstHierarchyId = firstHierarchyId;
	}
	public Integer getDisplayOrder() {
		return displayOrder;
	}
	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
	}
	public List<ThirdHierarchy> getThirdHierarchyList() {
		return thirdHierarchyList;
	}
	public void setThirdHierarchyList(List<ThirdHierarchy> thirdHierarchyList) {
		this.thirdHierarchyList = thirdHierarchyList;
	}
	@Override
	public String toString() {
		return "SecondHierarchyForm [id=" + id + ", explanation=" + explanation + ", firstHierarchyId="
				+ firstHierarchyId + ", displayOrder=" + displayOrder + ", thirdHierarchyList=" + thirdHierarchyList
				+ "]";
	}
}
