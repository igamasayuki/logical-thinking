package jp.co.runy.logical_thinking.domain;

import java.util.List;

import lombok.Data;

/**
 * @author takahashikouhei ロジックツリーの第三階層を表すクラス.
 */
@Data
public class ThirdHierarchy {
	
	private int id;
	private String explanation;
	private Integer secondHierarchyId;
	private Integer displayOrder;
	private List<FourthHierarchy> fourthHierarchyList;
}