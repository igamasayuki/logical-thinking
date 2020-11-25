package jp.co.runy.logical_thinking.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import jp.co.runy.logical_thinking.domain.SecondHierarchy;

@Mapper
public interface SecondHierarchyMapper {
	public List<SecondHierarchy> selectSecondHierarchy();
}
