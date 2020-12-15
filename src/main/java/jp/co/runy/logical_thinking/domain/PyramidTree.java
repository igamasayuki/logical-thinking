package jp.co.runy.logical_thinking.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import jp.co.runy.logical_thinking.form.ExampleForm;
import jp.co.runy.logical_thinking.form.ReasonForm;

public class PyramidTree {

    public String name;

    public String title;

    List<PyramidTree> children = new ArrayList<>();

    public PyramidTree(ReasonForm r) {
        this.name = r.getWord();
        this.title = r.getExplanation();
        this.children = r.getEvidenceFormList().stream()
                            .map(e -> new PyramidTree(e))
                            .collect(Collectors.toList());
    }
    
    public PyramidTree(ExampleForm e) {
        this.name = "証拠";
        this.title = e.getExplanation();
    }

	public PyramidTree() {
	}

	public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<PyramidTree> getChildren() {
        return children;
    }

    public void setChildren(List<PyramidTree> children) {
        this.children = children;
    }

}
