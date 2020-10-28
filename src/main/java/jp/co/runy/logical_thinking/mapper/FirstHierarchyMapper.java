package jp.co.runy.logical_thinking.mapper;

import org.apache.ibatis.annotations.Mapper;

import jp.co.runy.logical_thinking.domain.FirstHierarchy;

@Mapper
public interface FirstHierarchyMapper {
	int upsert(FirstHierarchy firstHierarchy);
}
