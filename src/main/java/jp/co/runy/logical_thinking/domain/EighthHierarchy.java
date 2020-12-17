package jp.co.runy.logical_thinking.domain;


import lombok.Data;

/**
 * @author hashimotoshinya
 * ロジックツリーの第8階層を表すクラス.
 */
@Data
public class EighthHierarchy {
	private int id;
	private String explanation;
	private Integer seventhHierarchyId;
	private Integer displayOrder;
}
