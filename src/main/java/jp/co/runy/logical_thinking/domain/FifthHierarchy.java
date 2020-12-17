package jp.co.runy.logical_thinking.domain;

import java.util.List;

import lombok.Data;

/**
 * @author hashimotoshinya
 * ロジックツリーの第二階層を表すクラス.
 */
@Data
public class FifthHierarchy {
	private int id;
	private String explanation;
	private Integer fourthHierarchyId;
	private Integer displayOrder;
	private List<SixthHierarchy> sixthHierarchyList;
	
}
