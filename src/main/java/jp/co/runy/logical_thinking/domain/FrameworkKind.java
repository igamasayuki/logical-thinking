package jp.co.runy.logical_thinking.domain;

import java.util.ArrayList;
import java.util.List;

/**
 * @author takahashikouhei
 * フレームワークを検索するクラス.
 */
public class FrameworkKind {
	
	private int id;
	private String summaｒy;
	private List<Framework> frameworkList = new ArrayList<>();
	
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
	 * @return the summary
	 */
	public String getSummary() {
		return summaｒy;
	}
	/**
	 * @param summary the summary to set
	 */
	public void setSummary(String summary) {
		this.summaｒy = summary;
	}
	/**
	 * @return the frameworkList
	 */
	public List<Framework> getFrameworkList() {
		return frameworkList;
	}
	/**
	 * @param frameworkList the frameworkList to set
	 */
	public void setFrameworkList(List<Framework> frameworkList) {
		this.frameworkList = frameworkList;
	}
	
	

}
