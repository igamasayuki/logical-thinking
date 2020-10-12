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
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Integer getFrameworkKindId() {
		return frameworkKindId;
	}
	public void setFrameworkKindId(Integer frameworkKindId) {
		this.frameworkKindId = frameworkKindId;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public List<FrameworkElement> getFrameworkElementList() {
		return frameworkElementList;
	}
	public void setFrameworkElementList(List<FrameworkElement> frameworkElementList) {
		this.frameworkElementList = frameworkElementList;
	}
	

	
	

}
