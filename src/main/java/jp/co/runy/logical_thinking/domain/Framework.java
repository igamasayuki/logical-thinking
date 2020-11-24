package jp.co.runy.logical_thinking.domain;

import java.util.ArrayList;
import java.util.List;

/**
 * @author takahashikouhei
 * フレームワークのクラス
 */
public class Framework {
	
	private int id;
	private Integer frameworkKindId;
	private String content;
	private List<FrameworkElement> frameworkElementList = new ArrayList<>();
	
	
	/** 
	 * @return int
	 */
	public int getId() {
		return id;
	}
	
	/** 
	 * @param id
	 */
	public void setId(int id) {
		this.id = id;
	}
	
	/** 
	 * @return Integer
	 */
	public Integer getFrameworkKindId() {
		return frameworkKindId;
	}
	
	/** 
	 * @param frameworkKindId
	 */
	public void setFrameworkKindId(Integer frameworkKindId) {
		this.frameworkKindId = frameworkKindId;
	}
	
	/** 
	 * @return String
	 */
	public String getContent() {
		return content;
	}
	
	/** 
	 * @param content
	 */
	public void setContent(String content) {
		this.content = content;
	}
	
	/** 
	 * @return List<FrameworkElement>
	 */
	public List<FrameworkElement> getFrameworkElementList() {
		return frameworkElementList;
	}
	
	/** 
	 * @param frameworkElementList
	 */
	public void setFrameworkElementList(List<FrameworkElement> frameworkElementList) {
		this.frameworkElementList = frameworkElementList;
	}
	

	
	

}
