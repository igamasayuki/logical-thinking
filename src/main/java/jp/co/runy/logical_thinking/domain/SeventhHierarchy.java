package jp.co.runy.logical_thinking.domain;

import java.util.List;

import lombok.Data;

/**
 * @author hashimotoshinya
 * ロジックツリーの第7階層を表すクラス.
 */
@Data
public class SeventhHierarchy {
	private int id;
	private String explanation;
	private Integer sixthHierarchyId;
	private Integer displayOrder;
	private List<EighthHierarchy> eighthHierarchList;
}
