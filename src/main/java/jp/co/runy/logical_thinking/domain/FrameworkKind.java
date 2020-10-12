package jp.co.runy.logical_thinking.domain;

import java.util.ArrayList;
import java.util.List;

/**
 * @author takahashikouhei
 * フレームワークを検索するクラス
 */
public class FrameworkKind {
	
	private int id;
	private String summay;
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
	 * @return the summay
	 */
	public String getSummay() {
		return summay;
	}
	/**
	 * @param summay the summay to set
	 */
	public void setSummay(String summay) {
		this.summay = summay;
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
