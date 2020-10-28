package jp.co.runy.logical_thinking.mapper;

import org.apache.ibatis.annotations.Mapper;

import jp.co.runy.logical_thinking.domain.ThirdHierarchy;

@Mapper
public interface ThirdHierarchyMapper {
	void upsert(ThirdHierarchy thirdHierarchy);
}
