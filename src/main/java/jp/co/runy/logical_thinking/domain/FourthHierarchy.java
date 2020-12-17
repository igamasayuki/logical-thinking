package jp.co.runy.logical_thinking.domain;

import java.util.List;

import lombok.Data;

/**
 * @author hashimotoshinya
 * ロジックツリーの第4階層を表すクラス.
 */
@Data
public class FourthHierarchy {
	private int id;
	private String explanation;
	private Integer thirdHierarchyId;
	private Integer displayOrder;
	private List<FifthHierarchy> fifthHierarchyList;
}
