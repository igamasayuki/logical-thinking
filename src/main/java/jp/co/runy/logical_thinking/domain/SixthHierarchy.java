package jp.co.runy.logical_thinking.domain;

import java.util.List;

import lombok.Data;

/**
 * @author hashimotoshinya
 * ロジックツリーの第6階層を表すクラス.
 */
@Data
public class SixthHierarchy {
	private int id;
	private String explanation;
	private Integer fifthHierarchyId;
	private Integer displayOrder;
	private List<SeventhHierarchy> seventhHierarchyList;
	
}
