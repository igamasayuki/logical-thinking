package jp.co.runy.logical_thinking.domain;

import java.util.List;

import lombok.Data;

/**
 * @author takahashikouhei
 * ロジックツリーの第二階層を表すクラス.
 */
@Data
public class SecondHierarchy {
	private int id;
	private String explanation;
	private Integer firstHierarchyId;
	private Integer displayOrder;
	private List<ThirdHierarchy> thirdHierarchyList;
}
